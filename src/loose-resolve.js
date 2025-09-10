import { promises as fs } from 'node:fs';
import { relative, resolve } from 'node:path';

export async function looseResolve(cwd, file) {
  if (file.includes('*')) return `./${relative(cwd, file)}`;
  const stat = await fs.stat(file).catch(() => null);
  if (stat?.isDirectory()) return looseResolve(cwd, `${file}/index`);
  if (file.match(/\.[cm]js$/)) return `./${relative(cwd, file)}`;
  return (
    (
      await Promise.all(
        ['.ts', '.tsx', '.jsx', '.mjs', '.cjs', '.js'].map(async (ext) => {
          const f = `./${relative(cwd, file + ext)}`;
          try {
            if ((await fs.stat(resolve(cwd, f))).isFile()) return f;
          } catch {}
        })
      )
    ).find(Boolean) ?? file
  );
}
