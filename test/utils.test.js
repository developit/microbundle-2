import test from 'node:test';
import assert from 'node:assert/strict';
import { padAnsi, dim, prettyBytes } from '../src/utils.js';

test('padAnsi accounts for ANSI codes', () => {
  const colored = dim('ok');
  const padded = padAnsi(colored, 5);
  assert.equal(padded, colored + '   ');
});

test('prettyBytes formats values', () => {
  assert.equal(prettyBytes(500), `500${dim('b')}`);
  assert.equal(prettyBytes(1536), `1.5${dim('kb')}`);
  assert.equal(prettyBytes(2_000_000), `2${dim('mb')}`);
});
