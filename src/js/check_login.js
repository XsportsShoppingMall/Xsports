function checkLoginStatus(object, button) {
    fetch('php/get_user_id.php')
        .then(response => response.text())
        .then(userID => {
            var isLoggedIn = userID != "";
            handleLoginStatus(isLoggedIn, object, button); // 로그인 상태 체크 및 버튼 표시 처리 함수 호출
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const closeModalButton = document.querySelector('.closeCartModal');
const modalOverlay = document.querySelector('#modal-overlay');

function handleLoginStatus(isLoggedIn,object,button) {
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
            if (isLoggedIn) {
            // 로그인 상태인 경우
                //cart modal 등장
                
                button.addEventListener('click', () => {
                    modalOverlay.classList.remove('d-none');
                });
                closeModalButton.addEventListener('click',() => {
                    modalOverlay.classList.add('d-none');
                });
                
                // 아이템 받아오기

                

                //해당 아이템을 장바구니 테이블에 넣기

                //장바구니로 이동합니까?

            } else {
            // 로그아웃 상태인 경우
            button.addEventListener('click', () => {
                alert("로그인이 필요합니다.");
                window.location.href = "login.html";
            });
               
            }
            break;
        case 'favorite':
            if (isLoggedIn) {0
                // 로그인 상태인 경우
                // 서버로부터 favorite 정보 불러오기
                // 불러온 정보 확인 후 favorite 표시
                
                
                // 버튼 토글 기능
                    
    
                // 해당 상품 favorite 테이블에 추가
    
                } else {
                // 로그아웃 상태인 경우
                    button.addEventListener('click', () => {
                        alert("로그인이 필요합니다.");
                        window.location.href = "login.html";
                    });
                }
                break;
    }
}
