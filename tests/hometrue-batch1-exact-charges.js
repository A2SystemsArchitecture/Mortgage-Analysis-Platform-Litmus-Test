// Exact-charge regression coverage for the four Batch 1 closing models.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'platform.html'), 'utf8');
const countiesStart = html.indexOf('const COUNTIES = {');
const countiesEnd = html.indexOf('\n};', countiesStart) + 3;
const closingStart = html.indexOf('function buildClosingCosts(inp)');
const closingEnd = html.indexOf('function buildHomesteadGuide(inp)', closingStart);
assert(countiesStart >= 0 && countiesEnd > countiesStart && closingStart > countiesEnd && closingEnd > closingStart);
const source = html.slice(countiesStart, countiesEnd) + '\n' + html.slice(closingStart, closingEnd);
const test = "\nlet ACTIVE_COUNTY;\nconst fmt = n => '$' + Math.round(n).toLocaleString('en-US');\nconst rows = [\n  ['miami-dade', 400001, 320123, ['$2,400.60', '$1,120.70', '$640.25', '$1,945.95', '$2,075.50', '$25', '$2,945.50', '$12,823.45']],\n  ['miami-dade', 100000, 0, ['$575', '$1,420']],\n  ['broward', 400001, 320123, ['$2,800.70', '$1,120.70', '$640.25', '$1,945.95']],\n  ['fulton', 400001, 320001, ['$400.10', '$961.50', '$1,081.50']],\n  ['fulton', 10000000, 9000000, ['$25,000', '$25,120']],\n  ['jefferson-al', 400001, 320001, ['$80.00', '$480.15', '$670.15']],\n  ['charleston-sc', 400001, 320000, ['($1,481.85)']],\n  ['charleston-sc', 100, 0, ['($0)']],\n  ['charleston-sc', 101, 0, ['($1.85)']]\n];\nfor (const [key, price, loan, expected] of rows) {\n  ACTIVE_COUNTY = key;\n  const output = buildClosingCosts({price, loan, tier: 2, bi: 300, br: 7, ty1: 300, wt: 3500, dpct: (price-loan)*100/price, damt: price-loan});\n  for (const value of expected) {\n    if (!output.includes(value)) throw Error(key + ': missing ' + value);\n  }\n}\nreturn {cases:rows.length, checks:rows.reduce((count, row) => count + row[3].length, 0)};\n";
const result = new Function(source + '\n' + test)();
assert.deepEqual(result, {cases: 9, checks: 25});
console.log('PASS: 25 exact-charge checks across 9 Batch 1 scenarios');
