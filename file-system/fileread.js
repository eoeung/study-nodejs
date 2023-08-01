// import { readFile } from 'node:fs';

// readFile('./sample.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

var fs = require('fs');
// fs.readFile('./sample.txt', (err, data) => {
//   console.log(data);
// });

// utf8 적용
fs.readFile('./sample.txt', 'utf8', (err, data) => {
    console.log(data);
  });