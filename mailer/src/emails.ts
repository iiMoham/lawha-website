// The two e-mails a «start» request sends: the request itself to the team, and a short confirmation to the visitor.
// Copy comes from the site's i18n so the e-mail and the thank-you panel say the same thing.
// Mail clients ignore most CSS: layout is tables, styles are inline, and the one <style> block only adds the
// brand font (Apple Mail, iOS) and the phone padding. Everything must still read well without it.
import { content, type Lang } from '../../src/i18n.ts';

const SITE = 'https://lawha.tech';
const C = { bg: '#f7f8fa', surface: '#eceff3', ink: '#0a0d14', muted: '#535b6b', accent: '#2453ff', soft: '#e4eaff', white: '#ffffff' };
const FONT = `'Wafeq','IBM Plex Sans Arabic','Geeza Pro',Tahoma,'Segoe UI',Arial,sans-serif`;

export type Lead = {
  name: string;
  phone: string; // 05xxxxxxxx
  business: string;
  kind: string;
  screens: string;
  plan: string; // the package picked on a pricing card, or ''
  city: string;
  email: string;
  notes: string;
  lang: Lang;
};
export type Mail = { subject: string; html: string; text: string };

const KINDS = content.ar.start.fields.kind.options.map((o) => o.value);
const SCREENS = content.ar.start.fields.screens.options.map((o) => o.value);
const PLANS = content.ar.pricing.plans.map((p) => p.id);
const planName = (lang: Lang, id: string) => content[lang].pricing.plans.find((p) => p.id === id)?.name ?? '';
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

const digitsOf = (raw: string) =>
  raw.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0)).replace(/[^\d+]/g, '');
/** Saudi mobile in any common form → 05xxxxxxxx, or '' */
export const phoneOf = (raw: string) => {
  const m = /^(?:\+?966|00966|0)?(5\d{8})$/.exec(digitsOf(raw));
  return m ? `0${m[1]}` : '';
};
const clip = (s: string, max: number) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

/** Checks and cleans a submitted form. Returns the lead, or the names of the fields that are wrong. */
export function parseLead(raw: Record<string, unknown>): { lead: Lead } | { bad: string[] } {
  const s = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string) : '');
  const lead: Lead = {
    name: clip(s('name'), 80),
    phone: phoneOf(s('phone')),
    business: clip(s('business'), 100),
    kind: s('kind'),
    screens: s('screens'),
    plan: PLANS.includes(s('plan') as never) ? s('plan') : '',
    city: clip(s('city'), 60),
    email: clip(s('email'), 120).toLowerCase(),
    notes: s('notes').replace(/\r\n?/g, '\n').trim().slice(0, 1000),
    lang: s('lang') === 'en' ? 'en' : 'ar',
  };
  const bad = [
    lead.name.length < 2 && 'name',
    !lead.phone && 'phone',
    !KINDS.includes(lead.kind as never) && 'kind',
    !SCREENS.includes(lead.screens as never) && 'screens',
    lead.email !== '' && !EMAIL_RE.test(lead.email) && 'email',
  ].filter((x): x is string => typeof x === 'string');
  return bad.length ? { bad } : { lead };
}

/** Text a stranger typed, shown back in an e-mail sent to someone else: kept only if it can't carry a link. */
export const safeEcho = (s: string, max = 40) => {
  const t = clip(s, max + 1);
  if (t.length > max || /https?:|www\.|[<>@/\\]|\.[a-z]{2,}\b/i.test(t)) return '';
  return t;
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const prettyPhone = (p: string) => `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;
const label = (lang: Lang, value: string) => {
  const f = content[lang].start.fields;
  return [...f.kind.options, ...f.screens.options].find((o) => o.value === value)?.label ?? value;
};

// ---------- the frame both e-mails share ----------

function frame(o: { lang: Lang; title: string; preheader: string; head: string; body: string; foot: string }) {
  const rtl = o.lang === 'ar';
  const dir = rtl ? 'rtl' : 'ltr';
  const start = rtl ? 'right' : 'left';
  return `<!doctype html>
<html lang="${o.lang}" dir="${dir}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(o.title)}</title>
<style>
  @font-face { font-family: 'Wafeq'; src: url('${SITE}/email/wafeq-Regular.woff2') format('woff2'); font-weight: 400; }
  @font-face { font-family: 'Wafeq'; src: url('${SITE}/email/wafeq-Bold.woff2') format('woff2'); font-weight: 700; }
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
  a { color: ${C.accent}; }
  @media (max-width: 620px) {
    .pad { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 28px !important; line-height: 38px !important; }
    .big { font-size: 26px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};" dir="${dir}">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(o.preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" dir="${dir}" style="width:100%;max-width:600px;font-family:${FONT};text-align:${start};">
    <tr><td class="pad" bgcolor="${C.accent}" style="background:${C.accent};border-radius:20px 20px 0 0;padding:28px 40px 36px;color:${C.white};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" dir="${dir}"><tr>
        <td style="vertical-align:middle;"><a href="${SITE}${rtl ? '/' : '/en/'}" style="text-decoration:none;"><img src="${SITE}/email/logo-white.png" width="36" height="36" alt="" style="display:block;border:0;border-radius:8px;"></a></td>
        <td style="vertical-align:middle;padding-${start}:10px;font-family:${FONT};font-size:22px;line-height:28px;font-weight:700;color:${C.white};">${rtl ? 'لوحة' : 'Lawha'}</td>
      </tr></table>
      ${o.head}
    </td></tr>
    <tr><td class="pad" bgcolor="${C.white}" style="background:${C.white};border-radius:0 0 20px 20px;padding:36px 40px 40px;color:${C.ink};font-family:${FONT};font-size:16px;line-height:27px;">
      ${o.body}
    </td></tr>
    <tr><td class="pad" style="padding:24px 40px 8px;font-family:${FONT};font-size:13px;line-height:22px;color:${C.muted};">
      ${o.foot}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const h1 = (text: string) =>
  `<h1 class="h1" style="margin:44px 0 0;font-family:${FONT};font-size:34px;line-height:44px;font-weight:700;color:${C.white};">${esc(text)}</h1>`;
const p = (html: string, style = '') => `<p style="margin:0 0 16px;${style}">${html}</p>`;
const h2 = (text: string) => `<h2 style="margin:0 0 14px;font-family:${FONT};font-size:18px;line-height:26px;font-weight:700;color:${C.ink};">${esc(text)}</h2>`;

function rows(list: [string, string][], opts: { ltr?: string[]; nowrap?: string[] } = {}) {
  return list
    .map(
      ([k, v], i) => `<tr>
        <td style="padding:12px 16px;${i ? `border-top:1px solid ${C.white};` : ''}font-size:14px;line-height:22px;color:${C.muted};white-space:nowrap;vertical-align:top;width:1%;">${esc(k)}</td>
        <td style="padding:12px 16px;${i ? `border-top:1px solid ${C.white};` : ''}font-size:15px;line-height:22px;color:${C.ink};font-weight:700;vertical-align:top;${opts.nowrap?.includes(k) ? 'white-space:nowrap;' : 'word-break:break-word;'}"${opts.ltr?.includes(k) ? ' dir="ltr"' : ''}>${esc(v).replace(/\n/g, '<br>')}</td>
      </tr>`,
    )
    .join('');
}
const box = (inner: string, dir: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${dir}" bgcolor="${C.bg}" style="background:${C.bg};border-radius:14px;margin:0 0 32px;">${inner}</table>`;

// ---------- to the visitor ----------

export function customerEmail(lead: Lead): Mail {
  const lang = lead.lang;
  const rtl = lang === 'ar';
  const dir = rtl ? 'rtl' : 'ltr';
  const start = rtl ? 'right' : 'left';
  const s = content[lang].start;
  const r = s.reply;
  const f = s.fields;
  const name = safeEcho(lead.name);
  const business = safeEcho(lead.business, 60);
  const hello = name ? r.hello.replace('{name}', name) : r.helloAnon;
  const phone = prettyPhone(lead.phone);

  const summary: [string, string][] = [
    ...(business ? [[f.business.label, business] as [string, string]] : []),
    [f.kind.label, label(lang, lead.kind)],
    [f.screens.label, label(lang, lead.screens)],
    ...(lead.plan ? [[rtl ? 'الباقة' : 'Plan', planName(lang, lead.plan)] as [string, string]] : []),
    [f.phone.label, phone],
  ];

  const steps = s.next
    .map(
      (x, i) => `<tr>
        <td style="vertical-align:top;padding:0 0 18px;width:36px;">
          <div style="width:28px;height:28px;border-radius:14px;background:${C.soft};color:${C.accent};font-size:14px;line-height:28px;font-weight:700;text-align:center;">${i + 1}</div>
        </td>
        <td style="vertical-align:top;padding:2px 0 18px;padding-${start}:12px;">
          <div style="font-size:16px;line-height:24px;font-weight:700;color:${C.ink};">${esc(x.title)}</div>
          <div style="font-size:15px;line-height:24px;color:${C.muted};">${esc(x.text)}</div>
        </td>
      </tr>`,
    )
    .join('');

  const html = frame({
    lang,
    title: r.subject,
    preheader: r.preheader,
    head: h1(r.heading),
    body: [
      p(`<b>${esc(hello)}</b>`, 'font-size:17px;'),
      p(esc(r.intro)),
      `<p class="big" dir="ltr" style="margin:0 0 32px;font-size:30px;line-height:38px;font-weight:700;letter-spacing:0.02em;color:${C.accent};text-align:${start};"><a href="tel:${lead.phone}" style="color:${C.accent};text-decoration:none;">${phone}</a></p>`,
      h2(r.summary),
      box(rows(summary, { ltr: [f.phone.label], nowrap: [f.phone.label] }), dir),
      h2(s.nextTitle),
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${dir}">${steps}</table>`,
      `<p style="margin:8px 0 0;padding:14px 16px;border-radius:12px;background:${C.soft};color:${C.accent};font-size:15px;line-height:24px;font-weight:700;">${esc(s.assure)}</p>`,
    ].join('\n'),
    foot: [
      p(esc(r.footer), 'margin:0 0 8px;'),
      p(esc(r.ignore), 'margin:0 0 16px;'),
      p(`<a href="${SITE}${rtl ? '/' : '/en/'}" style="color:${C.muted};">lawha.tech</a> · ${esc(content[lang].footer.about)}`, 'margin:0;'),
    ].join('\n'),
  });

  const text = [
    hello,
    '',
    r.intro,
    phone,
    '',
    `${r.summary}:`,
    ...summary.map(([k, v]) => `- ${k}: ${v}`),
    '',
    `${s.nextTitle}`,
    ...s.next.map((x, i) => `${i + 1}. ${x.title}: ${x.text}`),
    '',
    s.assure,
    '',
    '—',
    r.footer,
    r.ignore,
    SITE,
  ].join('\n');

  return { subject: r.subject, html, text };
}

// ---------- to the team (always Arabic, like the form's old FormSubmit e-mail) ----------

export function teamEmail(lead: Lead): Mail {
  const ar = content.ar.start;
  const f = ar.fields;
  const phone = prettyPhone(lead.phone);
  const wa = `https://wa.me/966${lead.phone.slice(1)}`;
  // the form asks four things (name, phone, kind, screens); the rest only show when they were sent
  const opt = (k: string, v: string): [string, string][] => (v ? [[k, v]] : []);
  const list: [string, string][] = [
    [f.name.label, lead.name],
    [f.phone.label, phone],
    ...opt(f.business.label, lead.business),
    [f.kind.label, label('ar', lead.kind)],
    [f.screens.label, label('ar', lead.screens)],
    ...opt('الباقة المختارة', planName('ar', lead.plan)),
    ...opt(f.city.label, lead.city),
    ...opt(f.email.label, lead.email),
    ...opt('ملاحظات', lead.notes),
    ['لغة الصفحة', lead.lang === 'ar' ? 'العربية' : 'English'],
  ];
  const title = lead.business || lead.name;
  const btn = (href: string, text: string, solid: boolean) =>
    `<a href="${href}" style="display:inline-block;margin:0 0 8px 8px;padding:12px 22px;border-radius:999px;font-size:15px;line-height:20px;font-weight:700;text-decoration:none;${solid ? `background:${C.accent};color:${C.white};` : `background:${C.soft};color:${C.accent};`}">${text}</a>`;

  const html = frame({
    lang: 'ar',
    title: ar.mailSubject,
    preheader: `${title} · ${label('ar', lead.screens)} · ${phone}`,
    head: h1(title),
    body: [
      p(`${esc(ar.mailSubject)}${lead.email ? '. الرد على هذي الرسالة يروح للعميل مباشرة.' : '.'}`, `color:${C.muted};`),
      `<div style="margin:0 0 28px;">${btn(`tel:${lead.phone}`, `اتصل على <span dir="ltr">${phone}</span>`, true)}${btn(wa, 'واتساب', false)}</div>`,
      box(rows(list, { ltr: [f.phone.label, f.email.label], nowrap: [f.phone.label] }), 'rtl'),
    ].join('\n'),
    foot: p(`وصل من نموذج «ابدأ مع لوحة» في <a href="${SITE}" style="color:${C.muted};">lawha.tech</a>.`, 'margin:0;'),
  });
  const text = [ar.mailSubject, '', ...list.map(([k, v]) => `${k}: ${v}`), '', `واتساب: ${wa}`].join('\n');
  return { subject: `${ar.mailSubject}: ${clip(title, 80)}`, html, text };
}
