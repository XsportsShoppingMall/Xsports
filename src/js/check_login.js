var object
function checkLoginStatus(object) {
    fetch('php/get_user_id.php')
        .then(response => response.text())
        .then(userID => {
            var isLoggedIn = userID != "";
            handleLoginStatus(isLoggedIn, object); // 로그인 상태 체크 및 버튼 표시 처리 함수 호출
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleLoginStatus(isLoggedIn,object) {
    switch(object){
        case 'loginButton':
            var loginButton = document.getElementById('loginButton');
            var profileDropdown = document.getElementById('profileDropdown');
            if (isLoggedIn) {
            // 로그인 상태인 경우
            loginButton.classList.add('d-none');
            profileDropdown.classList.remove('d-none');
            console.log("loggedin");
            } else {
            // 로그아웃 상태인 경우
            profileDropdown.classList.add('d-none');
            loginButton.classList.remove('d-none');
            console.log("loggedout");
            }
            break;
        case 'cart':
            var cart
            if (isLoggedIn) {
            // 로그인 상태인 경우
            loginButton.classList.add('d-none');
            profileDropdown.classList.remove('d-none');
            console.log("loggedin");
            } else {
            // 로그아웃 상태인 경우
            profileDropdown.classList.add('d-none');
            loginButton.classList.remove('d-none');
            console.log("loggedout");
            }
            break;
        
    }
}