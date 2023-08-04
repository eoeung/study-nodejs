let args = process.argv;
console.log(args);
/*
$ node console.js moon
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\env\\study_nodejs\\console.js',
  'moon'
]

// 1) node.js runtime 위치
// 2) 실행시킨 파일 경로
// 3) 입력값
*/

/*
$ node console.js moon k8805
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\env\\study_nodejs\\console.js',
  'moon',
  'k8805
]

// 1) node.js runtime 위치
// 2) 실행시킨 파일 경로
// 3) 입력값
*/

if (Number(args[2])) {
  console.log('ABC');
} else {
  console.log('99999999');
}
