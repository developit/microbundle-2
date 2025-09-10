import test from 'node:test';
import assert from 'node:assert/strict';
import { getExports } from '../src/get-exports.js';

test('handles string export', () => {
  assert.deepEqual(getExports('./x.js'), {
    '.': [{ mapped: './x.js', conditions: [] }]
  });
});

test('handles condition object', () => {
  assert.deepEqual(
    getExports({ import: './x.mjs', default: './x.js' }),
    {
      '.': [
        { mapped: './x.mjs', conditions: ['import'] },
        { mapped: './x.js', conditions: [] }
      ]
    }
  );
});

test('throws on mixed paths and conditions', () => {
  assert.throws(
    () => getExports({ import: './x.mjs', './foo': './foo.js' }),
    /mixed conditions and paths/
  );
});
