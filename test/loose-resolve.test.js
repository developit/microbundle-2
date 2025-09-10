import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { looseResolve } from '../src/loose-resolve.js';

const cwd = resolve('test/fixtures/simple');

test('resolves missing extension', async () => {
  const file = resolve(cwd, 'a');
  const res = await looseResolve(cwd, file);
  assert.equal(res, './a.js');
});

test('resolves directory index', async () => {
  const res = await looseResolve(cwd, cwd);
  assert.equal(res, './index.js');
});
