// 1) node main.js로 실행
// 2) localhost:3000 으로 접속이 잘 되는 지 확인
// 3) node.js가 웹서버로써 동작하는 것을 확인할 수 있음

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html'); // https://www.npmjs.com/package/sanitize-html

var app = http.createServer(function (req, res) {
  let _url = req.url;
  let queryData = url.parse(_url, true).query; // [Object: null prototype] { id: 'HTML' }
  let pathname = url.parse(_url, true).pathname; // /, /create, /update, ...
  // console.log(pathname);
  // let title = queryData.id; // ?id=HTML이라는 QueryString을 통해서 시도한 경우

  // 홈으로 이동하는 경우
  if (pathname === '/') {
    // 쿼리스트링에서 id값이 없는 경우
    if (queryData.id === undefined) {
      fs.readdir('./data', function (err, fileList) {
        let title = 'welcome';
        let description = 'Hello, Node.js !';
        let list = template.list(fileList);
        let html = template.HTML(
          title,
          list,
          `<h2>${title}</h2><p>${description}</p>`,
          `<a href="/create">create</a>`
        );

        res.writeHead(200);
        res.end(html);
      });
      // 쿼리스트링에서 id의 값이 있는 경우
    } else {
      fs.readdir('./data', function (err, fileList) {
        let filteredId = path.parse(queryData.id).base;
        fs.readFile(
          `./data/${filteredId}`,
          'utf8',
          function (err, description) {
            let title = queryData.id;
            let sanitizeTitle = sanitizeHtml(title);
            // let sanitizeDescription = sanitizeHtml(description, {
            //   allowedTags: [ 'h1' ],
            // });
            let sanitizeDescription = sanitizeHtml(description);
            let list = template.list(fileList);
            let html = template.HTML(
              title,
              list,
              `<h2>${sanitizeTitle}</h2><p>${sanitizeDescription}</p>`,
              `<a href="/create">create</a>
               <a href="/update?id=${sanitizeTitle}">update</a>
               <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizeTitle}">
                <input type="submit" value="delete">
               </form>
               `
              //  <a href="/delete?id=${title}">delete</a>
              // 위 방식처럼 링크로 전송하는 것은 위험하다.
              // → 유저가 정보를 탈취할 수 있기 때문
            );
            res.writeHead(200);
            res.end(html);
          }
        );
      });
    }
    // 생성 페이지로 이동
  } else if (pathname === '/create') {
    fs.readdir('./data', function (err, fileList) {
      // let filteredId = path.parse(queryData.id).base;
      fs.readFile(
        // `./data/${filteredId}`,
        `./data/${queryData.id}`,
        'utf8',
        function (err, description) {
          let title = 'WEB - create';
          let list = template.list(fileList);
          let html = template.HTML(
            title,
            list,
            `<form action="/create_process" method="post">
                <p>
                    <input type="text" name="title" placeholder="title">
                </p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`,
            ''
          );
          res.writeHead(200);
          res.end(html);
        }
      );
    });
    // 생성 처리
  } else if (pathname === '/create_process') {
    // post로 전송한 데이터를 Node.js로 받아오는 방법
    let body = '';
    // request.on('data', callback) → 이벤트
    // → 콜백 함수가 실행될 때 마다 데이터를 수신한다.
    req.on('data', function (data) {
      // console.log(`### data : ${data}`); // ### data : title=abc&description=12345
      body += data;
    });
    // request.on('end', callback) → 이벤트
    // → 데이터 수신이 끝난 경우 실행
    req.on('end', function () {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      // console.log(post); // [Object: null prototype] { title: 'abc', description: '12345' }

      fs.writeFile(`./data/${title}`, description, 'utf8', function (err) {
        if (err) throw err;

        res.writeHead(302, {
          Location: `/?id=${title}`,
        });
        res.end();

        // 301과 302의 차이
        // 301: 영구적인 이동 / 302: 임시적인 이동
      });
    });
    // 수정 페이지로 이동
  } else if (pathname === '/update') {
    fs.readdir('./data', function (err, fileList) {
      let filteredId = path.parse(queryData.id).base;
      fs.readFile(
        `./data/${filteredId}`,
        'utf8',
        function (err, description) {
          let title = queryData.id;
          let list = template.list(fileList);
          let html = template.HTML(
            title,
            list,
            `<form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p>
                    <input type="text" name="title" placeholder="title" value="${title}">
                </p>
                <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          res.writeHead(200);
          res.end(html);
        }
      );
    });
    // 수정 처리
  } else if (pathname === '/update_process') {
    let body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;

      fs.rename(`./data/${id}`, `./data/${title}`, function (err) {
        if (err) throw err;

        fs.writeFile(`./data/${title}`, description, function (err) {
          if (err) throw err;

          res.writeHead(302, {
            Location: `/?id=${title}`,
          });
          res.end();
        });
      });
    });
    // 삭제 처리
  } else if (pathname === '/delete_process') {
    let body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      let post = qs.parse(body);
      let id = post.id;
      let filteredId = path.parse(id).base;

      fs.unlink(`./data/${filteredId}`, function (err) {
        if (err) throw err;

        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      });
    });

    // 존재하지 않는 페이지
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
