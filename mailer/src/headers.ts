// RFC 2047 encoded-words, ≤75 chars each, for non-ASCII header text (Arabic names and subjects).
// worker-mailer puts encoded names inside quotes, which some clients show raw, so these headers are set here.
const bytes = new TextEncoder();
const b64 = (s: string) => btoa(String.fromCharCode(...bytes.encode(s)));
export function encodeWords(text: string): string {
  if (!/[^\x20-\x7e]/.test(text)) return text;
  const words: string[] = [];
  let chunk = '';
  for (const ch of text) {
    if (bytes.encode(chunk + ch).length > 45) { words.push(chunk); chunk = ''; }
    chunk += ch;
  }
  if (chunk) words.push(chunk);
  return words.map((w) => `=?UTF-8?B?${b64(w)}?=`).join(' ');
}
export const addr = (name: string, email: string) => {
  const n = name.replace(/["\\\r\n]/g, '').trim();
  if (!n) return email;
  return /[^\x20-\x7e]/.test(n) ? `${encodeWords(n)} <${email}>` : `"${n}" <${email}>`;
};
