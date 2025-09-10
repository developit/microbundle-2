export const color = (code, end) => (str) => `\x1B[${code}m${str}\x1B[${end}m`;
export const bold = color(1, 22);
export const underline = color(4, 24);
export const dim = color(2, 22);
export const brightBlue = color(94, 39);
export const brightWhite = color(97, 39);
export const deAnsi = (str) => str.replace(/\x1B\[\d+m/g, '');
export const padAnsi = (str, len, padding) => {
  const count = len - deAnsi(str).length;
  return str.padEnd(str.length + count, padding);
};
export function prettyBytes(value) {
  if (value > 1.5e6) return `${Number((value / 1e6).toFixed(1))}${dim('mb')}`;
  if (value > 1.5e3) return `${Number((value / 1e3).toFixed(1))}${dim('kb')}`;
  return `${value}${dim('b')}`;
}
