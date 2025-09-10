import { posix } from 'node:path';

export function getExports(exports, map = {}, path = '.', conditions = []) {
  if (typeof exports === 'string') {
    conditions = Array.from(new Set(conditions)).sort();
    const c = map[path] || (map[path] = []);
    if (!c.find((m) => m.conditions.join('\n') === conditions.join('\n'))) {
      c.push({ mapped: exports, conditions });
    }
    return map;
  }
  let isPath;
  for (const key in exports) {
    if (isPath === undefined) isPath = key[0] === '.';
    if ((key[0] === '.') !== isPath) {
      throw Error(
        `Package Exports cannot contain mixed conditions and paths: ${Object.keys(exports)}`
      );
    }
    if (isPath) {
      getExports(exports[key], map, posix.join(path, key), conditions.slice());
    } else {
      const childConditions =
        key === 'default' ? conditions.slice() : conditions.concat(key);
      getExports(exports[key], map, path, childConditions);
    }
  }
  return map;
}
