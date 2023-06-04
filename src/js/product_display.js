function getProductList(category, search, sort, page) {
    const url = `php/get_represent_products.php?category=${category}&search=${search}&sort=${sort}&page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const productsContainer = document.querySelector('#product-container');
        productsContainer.innerHTML = ''; // 기존 상품 요소 초기화
  
        // 상품 리스트를 순회하며 동적으로 요소 생성
        data.forEach(async product => {
          const productCard = document.createElement('div');
          productCard.classList.add('col');
          productCard.innerHTML = `
            <div class="card shadow-sm">
              <div class="position-relative">
                <a href="more_information.html?product_id=${product.product_no}" class = "product-link">
                  <img src="${product.represent_imageURL}" class="bd-placeholder-img card-img-top" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="true"> 
                </a>
                <button type="button" class="btn btn-sm btn-outline-secondary favorite-button position-absolute bottom-0 end-0 mb-2 me-2">
                  <svg class="bi pe-none" width="16" height="16"><use xlink:href="#favorite" /></svg>
                </button>
              </div>
              <div class="card-body">
                <p class="card-text" style="height: 3em; overflow: hidden;">${product.name}</p>
                <p class="card-text">${product.price.toLocaleString()}원</p>
                <div class="d-flex justify-content-between align-items-center">
                  <button type="button" class="btn btn-sm btn-outline-secondary openCartModal">
                    <svg class="bi pe-none" width="16" height="16"><use xlink:href="#cart"/></svg>
                  </button>
                  <small class="d-flex justify-content-end text-body-secondary">
                    ${await generateStarRating(product.represent_product_no)}
                    (${await getReviewCount(product.represent_product_no)})
                  </small>
                </div>
              </div>
            </div>
          `;
          productsContainer.appendChild(productCard);
          // open
          const openModalButton = productCard.querySelector('.openCartModal');
          const favoriteButton = productCard.querySelector('.favorite-button');

          // Attach event listener to the button
          checkLoginStatus('cart', openModalButton);

          openModalButton.addEventListener('click', () => {
            getProductInfo(product.product_no)
                .then(product => {
                updateModal(product);
                });
          });


  
          // Attach event listener to the button
          checkLoginStatus('cart', openModalButton);
          
          openModalButton.addEventListener('click', () => {
            openModal(product);
          });
  
          checkLoginStatus('favorite', favoriteButton);
          
          favoriteButton.addEventListener('click', () => {
            favoriteButton.classList.toggle('btn-outline-danger');
          });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  async function generateStarRating(productNo) {
    const url = `php/get_star_rating.php?product_no=${productNo}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const averageRating = parseFloat(data.average_rating);
            let starIcons = '';

            if (averageRating >= 0 && averageRating < 0.5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(5);
            } else if (averageRating >= 0.5 && averageRating < 1) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-half"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(4);
            } else if (averageRating >= 1 && averageRating < 1.5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(4);
            } else if (averageRating >= 1.5 && averageRating < 2) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-half"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(3);
            } else if (averageRating >= 2 && averageRating < 2.5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>'
                    .repeat(2) +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(3);
            } else if (averageRating >= 2.5 && averageRating < 3) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-half"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(2);
            } else if (averageRating >= 3 && averageRating < 3.5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>'
                    .repeat(3) +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>'
                    .repeat(2);
            } else if (averageRating >= 3.5 && averageRating < 4) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-half"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>';
            } else if (averageRating >= 4 && averageRating < 4.5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>'
                    .repeat(4) +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star"/></svg>';
            } else if (averageRating >= 4.5 && averageRating <= 5) {
                starIcons = '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-fill"/></svg>' +
                    '<svg class="bi pe-none" width="16" height="16"><use xlink:href="#star-half"/></svg>';
            }

            return starIcons;
        })
        .catch(error => {
            console.error('Error:', error);
            return '';
        });
}

  
  async function getReviewCount(productNo) {
    const url = `php/get_review_count.php?product_no=${productNo}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.review_count;
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  }
  
//   // 페이지 로딩 시 초기 상품 리스트 요청
//   window.onload = function () {
//     const category = '';
//     const search = '';
//     const sort = 'views'; // 초기 정렬을 인기순으로 설정
//     const page = 1; // 첫 번째 페이지
//     getProductList(category, search, sort, page);
//   }
  
  // 사용자 입력 조건
  const buttons = document.querySelectorAll('.category'); // 카테고리 버튼들을 선택
  const searchInput = document.getElementById('search-input'); // 검색어 입력 필드
  const searchButton = document.getElementById('search-button'); // 검색 버튼
  let category = ''; // 선택한 카테고리를 저장할 변수
  let sort = 'views'; // 초기 정렬을 '인기순'으로 설정 (조회수 기준)
  let search = ''; // 검색어를 저장할 변수
  const page = 1; // 예시로 첫 번째 페이지
  
  // 검색 버튼 클릭 이벤트 처리
  searchButton.addEventListener('click', () => {
    search = searchInput.value; // 검색어 값
    getProductList(category, search, sort, page);
  });
  
  // 카테고리 버튼에 이벤트 리스너 추가
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      category = button.getAttribute('category'); // 클릭된 버튼의 category 속성 값
      searchInput.value = ''; // 검색어 필드 초기화
      search = ''; // 검색어 변수 초기화
      getProductList(category, search, sort, page);
    });
  });
  
  // 검색 창에서 Enter 키 이벤트 처리
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search = searchInput.value; // 검색어 값
      getProductList(category, search, sort, page);
    }
  });
  
  // 초기화면에서 모든 상품 불러오기 (인기순으로 정렬)
  getProductList(category, search, sort, page);
  
  // 정렬 기능 추가
  const sortViewsButton = document.getElementById('sort-views');
  const sortPriceButton = document.getElementById('sort-price');
  const sortAddDateButton = document.getElementById('sort-add-date');
  
  // 정렬 버튼 클릭 이벤트 처리
  sortViewsButton.addEventListener('click', () => {
    sort = 'views';
    getProductList(category, search, sort, page);
  });
  
  sortPriceButton.addEventListener('click', () => {
    sort = 'price';
    getProductList(category, search, sort, page);
  });
  
  sortAddDateButton.addEventListener('click', () => {
    sort = 'add_date';
    getProductList(category, search, sort, page);
  });
  
