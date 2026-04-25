/**
 * Regenerates src/pages/assignment4/writeupExported.js from the Assignment 4 write-up markdown
 * so the site can import the write-up as a string. Run: npm run gen-a4-writeup
 */
const fs = require('fs');
const path = require('path');

const writeupDir = path.join(__dirname, '../src/pages/assignment4/writeup');
const preferred = path.join(writeupDir, 'Assignment4_Writeup.md');
const fallback = path.join(writeupDir, 'Assignment4_Writeup 2.md');
const src = fs.existsSync(preferred) ? preferred : fallback;
const out = path.join(__dirname, '../src/pages/assignment4/writeupExported.js');

const md = fs.readFileSync(src, 'utf8');
const banner =
    `// AUTO-GENERATED from ${path.relative(path.join(__dirname, '..'), src).replace(/\\/g, '/')}\n` +
    '// Regenerate: npm run gen-a4-writeup\n\n';

fs.writeFileSync(out, banner + 'export default ' + JSON.stringify(md) + ';\n');
