/**
 * Unit Tests for Base64 Encoder / Decoder Application
 * Standard Node.js Test Runner (node --test)
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { encodeBase64, decodeBase64, formatFileSize } = require('../src/script.js');

test('Base64 Encoding - Standard String "Hello"', () => {
  const result = encodeBase64('Hello');
  assert.equal(result, 'SGVsbG8=');
});

test('Base64 Encoding - Standard String "Hello World"', () => {
  const result = encodeBase64('Hello World');
  assert.equal(result, 'SGVsbG8gV29ybGQ=');
});

test('Base64 Decoding - Standard String "SGVsbG8="', () => {
  const result = decodeBase64('SGVsbG8=');
  assert.equal(result, 'Hello');
});

test('Base64 Decoding - Standard String "SGVsbG8gV29ybGQ="', () => {
  const result = decodeBase64('SGVsbG8gV29ybGQ=');
  assert.equal(result, 'Hello World');
});

test('Base64 Encoding & Decoding - Unicode String "Hello 世界"', () => {
  const unicodeStr = 'Hello 世界';
  const encoded = encodeBase64(unicodeStr);
  const decoded = decodeBase64(encoded);
  assert.equal(decoded, unicodeStr);
});

test('Base64 Encoding - Validation Error on Empty Input', () => {
  assert.throws(() => {
    encodeBase64('');
  }, {
    name: 'Error',
    message: 'Input text cannot be empty.'
  });
});

test('Base64 Decoding - Validation Error on Empty Input', () => {
  assert.throws(() => {
    decodeBase64('');
  }, {
    name: 'Error',
    message: 'Base64 input string cannot be empty.'
  });
});

test('Base64 Decoding - Error on Invalid Base64 Format', () => {
  assert.throws(() => {
    decodeBase64('!!!InvalidBase64!!!');
  }, {
    name: 'Error',
    message: /Invalid Base64 format/
  });
});

test('Utility - formatFileSize Formatting Correctness', () => {
  assert.equal(formatFileSize(0), '0 Bytes');
  assert.equal(formatFileSize(1024), '1 KB');
  assert.equal(formatFileSize(1048576), '1 MB');
});
