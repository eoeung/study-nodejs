let testFolder = './data'; // readdir.js파일 위치가 아닌, 실행하고 있는 위치를 기준으로 적어줘야함
// → pwd를 통해 현재 위치를 알아내고, 그 위치를 기준으로 경로를 찾아온다.
let fs = require('fs');

fs.readdir(testFolder, function (err, fileList) {
    console.log(fileList); // [ 'css', 'html', 'javascript' ]
});
