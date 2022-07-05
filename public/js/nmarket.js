Kakao.init('9e690ea3b0d9e5d9bf13d2f47c70063a');
Kakao.isInitialized();

function kakaoLogin(){
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url:'/v2/user/me',
                success: function (response) { 
                    console.log(response);
                    document.getElementById('user').innerText = response.kakao_account.profile.nickname;
                    document.getElementById('login').style.display = "none";
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                }
            })
        }
    })
}



function kakaoLogout(){

}