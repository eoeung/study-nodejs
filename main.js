// 1) node main.js로 실행
// 2) localhost:3000 으로 접속이 잘 되는 지 확인
// 3) node.js가 웹서버로써 동작하는 것을 확인할 수 있음

var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(fileList) {
  let list = '<ul>';
  let i = 0;
  while (i < fileList.length) {
    list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';

  return list;
}

var app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query; // [Object: null prototype] { id: 'HTML' }
  let pathname = url.parse(_url, true).pathname;
  let title = queryData.id; // ?id=HTML이라는 QueryString을 통해서 시도한 경우

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', function (err, fileList) {
        let title = 'welcome';
        let description = 'Hello, Node.js !';
        let list = templateList(fileList);
        let template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>
        <p>${description}</p>`
        );

        res.writeHead(200);
        res.end(template);
      });
    } else {
      fs.readdir('./data', function (err, fileList) {
        fs.readFile(
          `./data/${queryData.id}`,
          'utf8',
          function (err, description) {
            let list = templateList(fileList);
            let template = templateHTML(
              title,
              list,
              `<h2>${title}</h2>
            <p>${description}</p>`
            );
            res.writeHead(200);
            res.end(template);
          }
        );
      });
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }

  //   res.end(fs.readFileSync(__dirname + _url)); // 읽어들여야할 파일을 읽어서 값을 가지고 온다.
  // res.end("Hello World! " + _url); // http://localhost:3000/111111.html → url값을 그대로 읽어온다.
  // ∴ 어떤 코드를 넣느냐에 따라 사용자에게 전송하는 데이터가 바뀜
  // → Web Server는 할 수 없지만 node.js는 할 수 있음
});
app.listen(3000);
