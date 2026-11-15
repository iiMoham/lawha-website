// Only the call the site makes at build time (Steps.astro renders the pairing QR as inline SVG).
declare module 'qrcode' {
  interface QRCodeToStringOptions {
    type?: 'svg' | 'utf8' | 'terminal';
    margin?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    color?: { dark?: string; light?: string };
  }
  const QRCode: { toString(text: string, options?: QRCodeToStringOptions): Promise<string> };
  export default QRCode;
}
