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

// cart modal
// Get the button element to open the modal
const openModalButton = document.querySelectorAll('.openCartModal');
const closeModalButton = document.querySelector('.closeCartModal');
// Get the modal element
const modalOverlay = document.querySelector('#modal-overlay');

// Attach event listener to the button

openModalButton.forEach(button => {
button.addEventListener('click', () => {
    checkLoginStatus('cart');
    }); 
});


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
            if (isLoggedIn) {0
            // 로그인 상태인 경우
                //cart modal 등장
                openModalButton.forEach(button => {
                button.addEventListener('click', () => {
                    modalOverlay.classList.remove('d-none');
                    }); 
                });

                closeModalButton.addEventListener('click',() => {
                    modalOverlay.classList.add('d-none');
                });

                // 아이템 받아오기

                // 갯수 조절 버튼
                var inputNumber = document.getElementById('productsNumbers');

                const incrementButton = document.querySelector(".increment-btn");
                const decrementButton = document.querySelector(".decrement-btn");
                
                incrementButton.addEventListener("click", () => {
                    var currentValue = parseInt(inputNumber.value);
                    inputNumber.value = currentValue + 1;
                });
                
                decrementButton.addEventListener("click", () => {
                    var currentValue = parseInt(inputNumber.value);
                    if (currentValue > 0) {
                    inputNumber.value = currentValue - 1;
                    }
                });

                //해당 아이템을 장바구니 테이블에 넣기

                //장바구니로 이동합니까?

            } else {
            // 로그아웃 상태인 경우
                alert("로그인이 필요합니다.");
                window.location.href = "login.html";
            }
            break;
        case 'favorite':
            if (isLoggedIn) {0
                // 로그인 상태인 경우
                // 서버로부터 favorite 정보 불러오기
                // 불러온 정보 확인 후 favorite 표시

                // 버튼 토글 기능
                    favoriteButtons.forEach(button => {
                        button.addEventListener('click', () => {
                        button.classList.toggle('btn-outline-danger');
                        });
                    });
    
                // 해당 상품 favorite 테이블에 추가
    
                } else {
                // 로그아웃 상태인 경우
                    alert("로그인이 필요합니다.");
                    window.location.href = "login.html";
                }
                break;
    }
}
