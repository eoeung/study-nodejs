// function a(){
//     console.log('A');
// }
let a = function () {
  console.log('A');
};
a();

// 굉장히 오랜 시간이 걸리는 함수가 있다고 가정
// 기능에 대한 실행이 끝난 다음, 기능을 실행한 쪽에게 함수가 끝났으니 다음 일을 하세요! → 콜백 함수
// 콜백을 실행
function slowfunc(callback) {
  callback();
}

slowfunc(a);