import { describe, expect, it } from 'vitest';
import { customerEmail, parseLead, phoneOf, safeEcho, teamEmail } from './emails.ts';

const good = { name: 'محمد', phone: '+966 50 123 4567', business: 'مقهى الركن', kind: 'cafe', screens: '2-3', email: 'A@Example.com', lang: 'ar' };

describe('phoneOf', () => {
  it('normalises Saudi mobiles', () => {
    expect(phoneOf('0501234567')).toBe('0501234567');
    expect(phoneOf('00966501234567')).toBe('0501234567');
    expect(phoneOf('٠٥٠١٢٣٤٥٦٧')).toBe('0501234567');
    expect(phoneOf('0112345678')).toBe('');
  });
});

describe('parseLead', () => {
  it('accepts and cleans a good request', () => {
    const r = parseLead(good);
    expect('lead' in r && r.lead).toMatchObject({ phone: '0501234567', email: 'a@example.com', lang: 'ar' });
  });
  it('takes the four-question form: no business name, plan only when known', () => {
    const r = parseLead({ name: 'سارة', phone: '0551234567', kind: 'restaurant', screens: '1', plan: 'vip', lang: 'ar' });
    expect('lead' in r && r.lead).toMatchObject({ business: '', plan: 'vip' });
    const r2 = parseLead({ ...good, plan: 'gold' });
    expect('lead' in r2 && r2.lead.plan).toBe('');
    expect(parseLead({ ...good, screens: 'growth' })).toEqual({ bad: ['screens'] });
  });
  it('names every bad field', () => {
    expect(parseLead({ ...good, name: 'x', kind: 'shop', email: 'nope' })).toEqual({ bad: ['name', 'kind', 'email'] });
  });
  it('treats a missing email as fine and unknown lang as Arabic', () => {
    const r = parseLead({ ...good, email: '', lang: 'fr' });
    expect('lead' in r && r.lead.lang).toBe('ar');
  });
});

describe('safeEcho', () => {
  it('drops anything that could carry a link', () => {
    expect(safeEcho('Sara')).toBe('Sara');
    expect(safeEcho('visit spam.com now')).toBe('');
    expect(safeEcho('www.x')).toBe('');
    expect(safeEcho('https://x')).toBe('');
    expect(safeEcho('a'.repeat(41))).toBe('');
  });
});

describe('emails', () => {
  const lead = (over = {}) => { const r = parseLead({ ...good, ...over }); if (!('lead' in r)) throw new Error('bad'); return r.lead; };
  it('greets by name and escapes HTML', () => {
    const m = customerEmail(lead({ business: 'Tom & <b>Jerry</b>' }));
    expect(m.html).toContain('هلا محمد،');
    expect(m.html).not.toContain('<b>Jerry</b>');
    expect(m.html).toContain('dir="rtl"');
  });
  it('falls back to a plain greeting and hides a spammy business name', () => {
    const m = customerEmail(lead({ name: 'go to evil.com', business: 'evil.com deals', lang: 'en' }));
    expect(m.html).toContain('Hi there,');
    expect(m.html).not.toContain('evil.com');
    expect(m.text).not.toContain('evil.com');
  });
  it('gives the team every field, in Arabic', () => {
    const m = teamEmail(lead({ notes: 'line1\nline2' }));
    expect(m.subject).toBe('طلب جديد من موقع لوحة: مقهى الركن');
    expect(m.html).toContain('https://wa.me/966501234567');
    expect(m.html).toContain('line1<br>line2');
  });
  it('titles the team e-mail with the name when there is no business name', () => {
    const m = teamEmail(lead({ business: '', plan: 'growth' }));
    expect(m.subject).toBe('طلب جديد من موقع لوحة: محمد');
    expect(m.html).toContain('الباقة المختارة');
    expect(m.html).toContain('2 – 3 شاشات');
  });
});
