import { describe, expect, it } from 'vitest';
import { addr, encodeWords } from './headers.ts';

const decode = (h: string) =>
  h.split(' ').map((w) => new TextDecoder().decode(Uint8Array.from(atob(/^=\?UTF-8\?B\?(.*)\?=$/.exec(w)![1]!), (c) => c.charCodeAt(0)))).join('');

describe('encodeWords', () => {
  it('leaves ASCII alone', () => expect(encodeWords('Hello')).toBe('Hello'));
  it('round-trips Arabic in words of 75 chars or fewer', () => {
    const s = 'طلب جديد من موقع لوحة: مقهى الركن في حي الملقا بالرياض';
    const h = encodeWords(s);
    expect(h.split(' ').every((w) => w.length <= 75)).toBe(true);
    expect(decode(h)).toBe(s);
  });
});

describe('addr', () => {
  it('quotes ASCII names and strips header breakers', () => expect(addr('Sa"ra\r\nBcc: x', 'a@b.co')).toBe('"SaraBcc: x" <a@b.co>'));
  it('encodes Arabic names outside quotes', () => expect(addr('لوحة', 'n@lawha.tech')).toMatch(/^=\?UTF-8\?B\?.+\?= <n@lawha\.tech>$/));
  it('falls back to the bare address', () => expect(addr('  ', 'a@b.co')).toBe('a@b.co'));
});
