/**
 * Smoke Test Suite for Base64 Encoder / Decoder Web Application
 * Verifies application bundle integrity, essential HTML elements, and production readiness.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING DEPLOYMENT SMOKE TESTS ===');

// Step 1: File Existence Verification
const requiredFiles = [
  path.join(__dirname, '../src/index.html'),
  path.join(__dirname, '../src/style.css'),
  path.join(__dirname, '../src/script.js'),
  path.join(__dirname, '../package.json')
];

requiredFiles.forEach(filePath => {
  const exists = fs.existsSync(filePath);
  console.log(`Checking file: ${path.basename(filePath)} ... ${exists ? 'OK' : 'FAILED'}`);
  assert.ok(exists, `Required file missing: ${filePath}`);
});

// Step 2: HTML Content & Semantic Element Validation
const htmlPath = path.join(__dirname, '../src/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const requiredElements = [
  '<title>Base64 Encoder / Decoder - DevOps Suite</title>',
  'id="textInput"',
  'id="textOutput"',
  'id="btnEncodeText"',
  'id="btnDecodeText"',
  'id="fileInputSelect"',
  'id="fileBase64Output"',
  'Veermaniyan.B'
];

requiredElements.forEach(element => {
  const contains = htmlContent.includes(element);
  console.log(`Checking DOM marker "${element.substring(0, 30)}..." ... ${contains ? 'OK' : 'FAILED'}`);
  assert.ok(contains, `DOM marker missing in index.html: ${element}`);
});

console.log('=== ALL SMOKE TESTS PASSED SUCCESSFULLY ===');
process.exit(0);
