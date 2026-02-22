const path = require('path');
console.log('__dirname:', __dirname);
const resolved = path.resolve(__dirname, '../frontend/index.html');
console.log('resolved:', resolved);
const fs = require('fs');
console.log('exists:', fs.existsSync(resolved));
