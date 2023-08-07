// refactoring
// → 잘 동작하는 코드를 짠 후, 리팩토링을 진행하면서 코드를 정리정돈 해야한다.
// let template = {
module.exports = {
    // HTML 템플릿
    HTML: function (title, list, body, control) {
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },
    // 파일 목록을 모두 가지고 온다.
    list: function (topics) {
      let list = '<ul>';
      let i = 0;
      while (i < topics.length) {
        list += `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
        i++;
      }
      list += '</ul>';
  
      return list;
    },
  };

//   module.exports = template;