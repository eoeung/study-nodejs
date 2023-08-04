let fs = require('fs');

// 1) readFileSync → 동기적으로 처리
// 리턴값이 존재
// console.log('A');
// let result = fs.readFileSync('./nodejs/sync.txt', 'utf8'); // sync.js를 실행할 위치가 'study_nodejs'이기 때문에, 저 경로에 맞춰서 작성해준다.
// console.log(result);
// console.log('C');
/*
A
B

C
*/

// 2) readFile → 비동기적으로 처리
// 리턴값이 존재하지 않음
console.log('A');
fs.readFile('./nodejs/sync.txt', 'utf8', function (err, result) {
  console.log(result);
}); // sync.js를 실행할 위치가 'study_nodejs'이기 때문에, 저 경로에 맞춰서 작성해준다.
// (1) readFile을 이용해서 파일을 읽어옴
// (2) 작업이 끝난 다음, callback함수를 실행
// → 파일을 읽은 다음에 나중에 함수를 통해 호출하는 것
console.log('C');
console.log('D');
console.log('E');
console.log('F');
/*
A
C
D
E
F
B

*/
// → 함수 안에 있는 코드는 나중에 실행되는 것을 알 수가 있음