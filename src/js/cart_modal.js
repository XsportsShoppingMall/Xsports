function getProductInfo(productID) {
    return fetch(`php/get_modal_product.php?productID=${productID}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

var op1;
var op2;
var op3;

function openModal(product){
    //상품 갯수 업데이트
    inputNumber.value = 1;
    //옵션 초기화
    op1 = op2 = op3 = "";

    getProductInfo(product.product_no)
    .then(product => {
    updateModal(product);
    });
}

const productsPrice = cartModal.querySelector('#modalProductsPrice');
var productNo;
var productIndex;

//옵션조절
const colorOption = cartModal.querySelector('#colorOption');
const sizeOption = cartModal.querySelector('#sizeOption');
const other_optionOption = cartModal.querySelector('#other_optionOption');

colorOption.addEventListener('change', () => {
    updatePrice(productNo);
});
sizeOption.addEventListener('change', () => {
    updatePrice(productNo);
});
other_optionOption.addEventListener('change', () => {
    updatePrice(productNo); 
});

//갯수조절
const inputNumber = document.getElementById('modalProductNumbers');
const incrementButton = document.querySelector('#increment-btn');
const decrementButton = document.querySelector('#decrement-btn');

inputNumber.addEventListener('input', () => {
    updatePrice(productNo);
  });
inputNumber.addEventListener('keydown', event => {
if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작 제거
    inputNumber.blur(); // 포커스 해제
}
});
  
incrementButton.addEventListener('click', () => {
let productNumbers = parseInt(inputNumber.value);
productNumbers += 1;
inputNumber.value = productNumbers;
updatePrice(productNo);
});

decrementButton.addEventListener('click', () => {
let productNumbers = parseInt(inputNumber.value);
if (productNumbers > 1) {
    productNumbers -= 1;
    inputNumber.value = productNumbers;
    updatePrice(productNo);
}
});



//상품, 옵션에 따른 가격 업데이트
function updatePrice(product_no) {
  op1 = op2 = op3 = "";
  if (colorOption !== null){
    op1 = colorOption.value;
  }
  if (sizeOption !== null){
    op2 = sizeOption.value;
  }
  if (other_optionOption !== null){
    op3 = other_optionOption.value;
  }
  console.log( op1 + ", " + op2 + ", " + op3)

  fetch(`php/get_price.php?product_no=${product_no}&color=${op1}&size=${op2}&other_option=${op3}`)
  .then(response => response.json())
  .then(data => {
    if (data === null) {productsPrice.textContent = "옵션 선택";}
    else{
      const price = parseInt(data.price);
      let productNumbers = parseInt(inputNumber.value);
      const totalPrice = price * productNumbers;
      productsPrice.textContent = totalPrice.toLocaleString() + '원';
      productIndex = data.product_index;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//옵션 생성함수 3종
function get_options(optional_products, optionCategory) {
  const options = []; // 배열로 초기화
  optional_products.forEach(optional_product => {
    if (!options.includes(optional_product[optionCategory]) && optional_product[optionCategory]!== "") {
      options.push(optional_product[optionCategory]);
    }
  });
  return options;
}
function generateOptionHTML(options) {
    
    if (options.length == 0){
        var optionHTML = '';
    }else{
        var optionHTML = '<option selected>옵션을 골라주세요</option>';
        options.forEach(option => {
            optionHTML += `<option value="${option}">${option}</option>`;
        });
    }
    return optionHTML;
}
function get_selections(optional_products,optionCategory) {
    const someOptionBox = document.querySelector("#"+optionCategory+"Optionbox");
    const optionSelect = document.querySelector("#"+optionCategory+"Option")

    if (optional_products.every(optional_product => optional_product[optionCategory] !== "")) {
        const options = get_options(optional_products, optionCategory);
        const optionHTML = generateOptionHTML(options);
        optionSelect.innerHTML = `
            ${optionHTML}
        `;
        someOptionBox.classList.remove('d-none');    
    }else{
        optionSelect.innerHTML = ``;
        someOptionBox.classList.add('d-none');
    }
}

// Modal을 업데이트하는 함수
function updateModal(product) {
    // Modal 요소 찾기
    const cartModal = document.querySelector('#cartModal');
  
    // 상품 이름 업데이트
    const productName = cartModal.querySelector('#productName');
    productName.textContent = product.name;
  
    // 상품 사진 업데이트
    const productImage = cartModal.querySelector('#modalProductImg');
    productImage.src = product.represent_imageURL;
  
    // optional_productTBL에서 product_no가 $productID인 상품의 옵션 가져오기
    productNo = product.product_no;
    const optionBox = cartModal.querySelector("#optionBox");
    fetch(`php/get_optional_products.php?productID=${productNo}`)
    .then(response => response.json())
    .then( optional_products => {
      get_selections(optional_products,'color');
      get_selections(optional_products,'size');
      get_selections(optional_products,'other_option');
    })
    .then(() => {
        updatePrice(productNo);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    
  
  
    // 나머지 내용 업데이트...
  }

  //장바구니 추가
const addToCartButton = document.querySelector('#add-cart');

addToCartButton.addEventListener('click', () => {
  // 회원 ID를 가져오는 요청
    fetch('php/get_user_id.php')
    .then(response => response.text())
    .then(id => {
    const memberID = id; // 회원 ID 값
    const productQuantity = parseInt(inputNumber.value);
        const data = {
            memberID: memberID,
            product_no: productNo,
            product_index: productIndex,
            product_quantity: productQuantity
        };
    console.log(data);

    // 서버로 데이터 전송
    fetch('php/add_to_cart.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // 성공적으로 장바구니에 추가되었을 때의 처리 로직
        console.log('상품이 장바구니에 추가되었습니다.');

        
    })
    .catch(error => {
        console.error('Error:', error);
        });
    })
    .catch(error => {
    console.error('Error:', error);
    });
})
    

  