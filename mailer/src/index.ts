// lawha-mailer: the «start» form's back end, on Cloudflare Workers (GitHub Pages can't send mail).
// It e-mails each request to the team (TEAM_EMAIL) and, when the visitor left an e-mail, sends them a
// confirmation from no-reply@lawha.tech. Mail goes out through Titan's SMTP as SMTP_USER (secret: SMTP_PASS).
//
// Accepts JSON (the page's script) or a normal form post (no script: answered with a redirect back to ?sent=1).
// Guards: only the site's origins, a honeypot field, a per-IP rate limit, strict field checks, and the
// confirmation only echoes text that can't carry a link.
import { WorkerMailer } from 'worker-mailer';
import { customerEmail, parseLead, teamEmail } from './emails.ts';
import { addr, encodeWords } from './headers.ts';

interface Env {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  TEAM_EMAIL: string;
  ALLOWED_ORIGINS: string;
  LIMIT?: { limit(o: { key: string }): Promise<{ success: boolean }> };
}

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(origin) } });
const cors = (origin: string | null): Record<string, string> =>
  origin ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept', 'Access-Control-Max-Age': '86400', Vary: 'Origin' } : {};

async function readBody(req: Request): Promise<{ data: Record<string, unknown>; isForm: boolean } | null> {
  const type = req.headers.get('Content-Type') ?? '';
  try {
    if (type.includes('application/json')) {
      const data: unknown = await req.json();
      return data && typeof data === 'object' ? { data: data as Record<string, unknown>, isForm: false } : null;
    }
    if (type.includes('form')) {
      const fd = await req.formData();
      const data: Record<string, unknown> = {};
      fd.forEach((v, k) => { if (typeof v === 'string') data[k] = v; });
      return { data, isForm: true };
    }
  } catch { /* fall through */ }
  return null;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
    const origin = req.headers.get('Origin');
    const ok = origin !== null && allowed.includes(origin);

    if (req.method === 'OPTIONS') return new Response(null, { status: ok ? 204 : 403, headers: cors(ok ? origin : null) });
    if (req.method !== 'POST') return new Response('lawha-mailer', { status: 405, headers: { Allow: 'POST, OPTIONS' } });
    if (!ok) return json({ success: false, error: 'origin' }, 403, null);

    const body = await readBody(req);
    if (!body) return json({ success: false, error: 'body' }, 400, origin);
    const { data, isForm } = body;
    const back = `${origin}${data['lang'] === 'en' ? '/en' : ''}/start/?sent=1`;
    const done = () => (isForm ? Response.redirect(back, 303) : json({ success: true }, 200, origin));

    // bots fill every field; pretend it worked
    if (typeof data['_honey'] === 'string' && data['_honey'] !== '') return done();

    if (env.LIMIT) {
      const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';
      const { success } = await env.LIMIT.limit({ key: ip });
      if (!success) return json({ success: false, error: 'rate' }, 429, origin);
    }

    const parsed = parseLead(data);
    if ('bad' in parsed) return json({ success: false, error: 'fields', fields: parsed.bad }, 400, origin);
    const { lead } = parsed;

    const fromName = lead.lang === 'ar' ? 'لوحة' : 'Lawha';
    let mailer: WorkerMailer | undefined;
    try {
      mailer = await WorkerMailer.connect({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: true,
        credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
        authType: ['plain', 'login'],
        name: 'lawha.tech',
      });
      const team = teamEmail(lead);
      await mailer.send({
        from: env.SMTP_USER,
        to: env.TEAM_EMAIL,
        subject: team.subject,
        html: team.html,
        text: team.text,
        headers: {
          From: addr('موقع لوحة', env.SMTP_USER),
          Subject: encodeWords(team.subject),
          ...(lead.email ? { 'Reply-To': addr(lead.name, lead.email) } : {}),
        },
      });
    } catch (e) {
      console.error('team mail failed', e);
      await mailer?.close().catch(() => {});
      return json({ success: false, error: 'send' }, 502, origin);
    }

    // the request reached the team; a failed confirmation must not tell the visitor it failed
    if (lead.email) {
      try {
        const mine = customerEmail(lead);
        await mailer.send({
          from: env.SMTP_USER,
          to: lead.email,
          subject: mine.subject,
          html: mine.html,
          text: mine.text,
          headers: {
            From: addr(fromName, env.SMTP_USER),
            'Reply-To': addr(fromName, env.TEAM_EMAIL),
            Subject: encodeWords(mine.subject),
            'Auto-Submitted': 'auto-replied',
          },
        });
      } catch (e) {
        console.error('confirmation failed', e);
      }
    }
    await mailer.close().catch(() => {});
    return done();
  },
};
