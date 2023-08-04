let M = {
    v: 'v',
    f: function(){
        console.log(this.v);
    }
}

// M이 가리키는 객체를 모듈 바깥에서 사용할 수 있도록 exports하겠다는 뜻
module.exports = M;