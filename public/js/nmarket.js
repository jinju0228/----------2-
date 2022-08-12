Kakao.init('9e690ea3b0d9e5d9bf13d2f47c70063a');
Kakao.isInitialized();


 document.getElementById('logout').style.display = "none"

function kakaoLogin(){
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url:'/v2/user/me',
                success: function (response) { 
                    console.log(response);
                    document.getElementById('user').innerText = (response.kakao_account.profile.nickname + '님 접속 중');
                    document.getElementById('login').style.display = "none";
                    document.getElementById('logout').style.display = "block";
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                }
            })
        }
    })
}



function kakaoLogout(){
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url:'/v1/user/unlink',
            success: function (response) { 
                console.log(response);
                document.getElementById('user').style.display = "none";
                document.getElementById('login').style.display = "block";
                document.getElementById('logout').style.display = "none";                
                alert('로그아웃 되었습니다.')
            }
        })

        Kakao.Auth.setAccessTocken(undefined)
      }
    //   Kakao.Auth.logout(function() {
    //     alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
    //   })
    }
