// 1) node main.js로 실행
// 2) localhost:3000 으로 접속이 잘 되는 지 확인
// 3) node.js가 웹서버로써 동작하는 것을 확인할 수 있음

var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query; // [Object: null prototype] { id: 'HTML' }
  // ?id=HTML이라는 QueryString을 통해서 시도한 경우
  let title = queryData.id;

  if (_url == '/') {
    title = 'Welcome';
  }

  if (_url == '/favicon.ico') {
    return res.writeHead(404);
  }

  res.writeHead(200);
  let template = `
  <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
  <img src="coding.jpg" width="100%">
  </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
  </p>
</body>
</html>
  `;
  res.end(template);

  //   res.end(fs.readFileSync(__dirname + _url)); // 읽어들여야할 파일을 읽어서 값을 가지고 온다.
  // res.end("Hello World! " + _url); // http://localhost:3000/111111.html → url값을 그대로 읽어온다.
  // ∴ 어떤 코드를 넣느냐에 따라 사용자에게 전송하는 데이터가 바뀜
  // → Web Server는 할 수 없지만 node.js는 할 수 있음
});
app.listen(3000);
