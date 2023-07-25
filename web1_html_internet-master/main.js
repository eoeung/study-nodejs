// 1) node main.js로 실행
// 2) localhost:3000 으로 접속이 잘 되는 지 확인
// 3) node.js가 웹서버로써 동작하는 것을 확인할 수 있음

var http = require('http');
var fs = require('fs');
var app = http.createServer(function(req, res){
    var url = req.url;
    if(req.url == '/'){
        url = '/index.html';
    }

    if(req.url == '/favicon.ico'){
        return res.writeHead(404);
    }

    res.writeHead(200);
    console.log(__dirname + url);
    res.end(fs.readFileSync(__dirname + url)); // 읽어들여야할 파일을 읽어서 값을 가지고 온다.
    // res.end("Hello World! " + url); // http://localhost:3000/111111.html → url값을 그대로 읽어온다.
    // ∴ 어떤 코드를 넣느냐에 따라 사용자에게 전송하는 데이터가 바뀜
    // → Web Server는 할 수 없지만 node.js는 할 수 있음
});
app.listen(3000);