// 필요한 DOM 요소 가져오기
const submitButton = document.querySelector('#submitPayment');
const selectAddress = document.querySelector('#inputGroupSelect01');
const receiverInput = document.querySelector('#receiver');
const addressInput = document.querySelector('#address');
const zipCodeInput = document.querySelector('#zip-code');
const shippingNicknameInput = document.querySelector('#shipping-nickname');
const usedPointInput = document.querySelector('#usage-points');
const paymentMetodInput = 1
const deliveryAddressNickName = 1
let paymentMethodType = "card";
let delivery_address_nickname ="직접입력";
let used_point=0;
let delivery_pay=0;
let ID;
let earned_point = 0;
let is_address_save = false;

var page = 1;
$(document).ready(async function(){
  const url = `php/get_user_id.php`
  fetch(url)
  .then(response => response.text())
  .then(async member_id => {
    ID = member_id;
  const url2 = `php/get_cart_item.php?member_id=${member_id}`;
  await fetch(url2)
  .then(response => response.json())
  .then(items => {
    const itemContainer = document.querySelector(".list-group");
    var it = 0;
    itemContainer.innerHTML = ``;

    items.forEach(item => {
      const product_image = item.represent_imageURL;
      it += 1;
      const vari = it;
      const quantity = item.product_quantity
      console.log(item.product_quantity);
      
      

      const item_list = document.createElement('li');
      item_list.classList.add('list-group-item');
      item_list.classList.add('lh-sm');   
      item_list.innerHTML = `
        <div class="d-flex justify-content-between mb-1 row">
            <span class="text-body-secondary col-8"><strong>${item.name}</strong><span>(${quantity}개)</span></span>
            <span class="text-body-secondary col-4" style="font-size:15px;"><strong class="price_amount">${(item.price_change*quantity).toLocaleString()+"원"}</strong></span>
        </div>
        <ol class="breadcrumb option-list">
            
        </ol>
      `;
      const optionContainer= item_list.querySelector(".option-list");
      if (item.size !== ""){
        const option_list = document.createElement('li');
        option_list.classList.add('breadcrumb-item');
        option_list.innerHTML = `
            <small>${item.size}</small>
        `
        optionContainer.appendChild(option_list);
      }
      if (item.color !== ""){
        const option_list = document.createElement('li');
        option_list.classList.add('breadcrumb-item');
        option_list.innerHTML = `
            <small>${item.color}</small>
        `
        optionContainer.appendChild(option_list);
      }
      if (item.other_option !== ""){
        const option_list = document.createElement('li');
        option_list.classList.add('breadcrumb-item');
        option_list.innerHTML = `
            <small>${item.other_option}</small>
        `
        optionContainer.appendChild(option_list);
      }
      itemContainer.appendChild(item_list);
      console.log(item_list);
      console.log(itemContainer);
      
      })

  
      itemContainer.innerHTML +=`
      <li class="list-group-item lh-sm">
        <div class="d-flex justify-content-between mb-1">
            <span class="text-body-secondary"><strong>사용 포인트</strong></span>
            <span class="text-body-secondary"><strong id="cart-use-point">- 0 p</strong></span>
        </div>  
    </li>
    <li class="list-group-item lh-sm">
        <div class="d-flex justify-content-between mb-1">
            <span class="text-body-secondary"><strong>배송비</strong></span>
            <span class="text-body-secondary"><strong>2,500원</strong></span>
        </div>  
    </li>
    <li class="list-group-item d-flex justify-content-between">
    <span>총계</span>
    <strong class="total_price">total_price\</strong>
    </li>
    <li class="list-group-item d-flex justify-content-between text-secondary">
        <span>적립 포인트</span>
        <strong id = "pointsEarned">+ 230 p\</strong>
    </li>
      `
      
    //포인트 불러오기
    console.log(member_id);
    const url3 = `php/get_member_information.php?member_id=${member_id}`;
      fetch(url3)
      .then(response => response.json())
      .then(member_data =>{
        console.log(member_data[0].current_point);
        $("#current-point").text(member_data[0].current_point+" p");
        //포인트 제한
        const usagePointsInput = document.getElementById('usage-points');
        const availablePoints = member_data[0].current_point; // 보유 포인트 값 (예시)

        const paymentButton = document.querySelector('.btn-primary');
        let previousPoints = 0;

        //포인트 변경시 작동
        usagePointsInput.addEventListener('input', function() {
            const usagePoints = parseInt(usagePointsInput.value);
            
            if (usagePoints > availablePoints) {
                usagePointsInput.value = availablePoints; // 최대치로 늘려주기
                usagePointsInput.classList.add('is-invalid');
                usagePointsInput.nextElementSibling.nextElementSibling.textContent = '사용 포인트가 보유 포인트보다 클 수 없습니다.';
            } else {
                usagePointsInput.classList.remove('is-invalid');
                usagePointsInput.nextElementSibling.nextElementSibling.textContent = '';
                previousPoints = usagePoints; // 이전에 입력한 값을 기록
            }
            //포인트 적용
            console.log(usagePointsInput.value)
            if(usagePointsInput.value == ""){
              $("#cart-use-point").text("- 0 p")
            }else{
            $("#cart-use-point").text("- "+usagePointsInput.value+" p");
            }
            var total = 0;
            $(".price_amount").each(function() {
              total += parseInt(this.textContent.replace(/[^0-9]/g,""));
              console.log(total);
              return total;
            })
            $(".item_price").text(total.toLocaleString());
            $(".total_price").text((total+2500-usagePointsInput.value).toLocaleString()+"원");
            used_point = usagePointsInput.value;
            delivery_pay = total+2500-usagePointsInput.value;
            // $("#pointsEarned").text("+"+total/10+" p");
        })
        ;
        
      
        paymentButton.addEventListener('click', function(event) {
            const usagePoints = parseInt(usagePointsInput.value);
            
            if (usagePoints > availablePoints) {
                event.preventDefault(); // 폼 전송 막기
                usagePointsInput.value = availablePoints; // 최대치로 늘려주기
                usagePointsInput.classList.add('is-invalid');
                usagePointsInput.nextElementSibling.nextElementSibling.textContent = '사용 포인트가 보유 포인트보다 클 수 없습니다.';
            } else {
                usagePointsInput.classList.remove('is-invalid');
                usagePointsInput.nextElementSibling.nextElementSibling.textContent = '';
            }
        });

        //수령인
        $("#receiver").attr("placeholder", member_data[0].name);
      
      });
      
      
      
//
    })
  })
    .then(function(){
      var total = 0;
      $(".price_amount").each(function() {
        total += parseInt(this.textContent.replace(/[^0-9]/g,""));
        console.log(total);
        return total;
      })
      $(".item_price").text(total.toLocaleString());
      $(".total_price").text((total+2500).toLocaleString()+"원");
      $("#pointsEarned").text("+"+Math.round(total*0.01)+" p");
      earned_point = Math.round(total*0.01);
      delivery_pay = total+2500;
    })
})

//추가 배송지들 설정
fetch(`php/get_additional_address.php?member_id=${ID}`)
.then(result =>result.json())
.then(address=>{
  address.forEach(addr => {
    const option = document.createElement('option');
    option.textContent = `${addr.address_nickname}, ${addr.address}, ${addr.zipcode}`;
    selectAddress.appendChild(option);
  });
});



$(document).ready(function() {
    $("#cc-name, #cc-date").attr("required", true);
    $(".btn-check").change(function() {
      const selectedRadio = $(this).attr("id");
  
      // 모든 입력 필드의 required 속성 제거
      $("#phone-number, #cash-amount").removeAttr("required");
  
      // 선택한 라디오 버튼에 따라 필수 입력 항목 설정
      if (selectedRadio === "btnradio1") {
        // 신용카드 선택 시
        $("#cc-name, #cc-date").attr("required", true);
      } else if (selectedRadio === "btnradio2") {
        // 스마트폰 선택 시
        $("#phone-number").attr("required", true);
      } else if (selectedRadio === "btnradio3") {
        // 계좌이체 선택 시
        $("#cash-amount").attr("required", true);
      }
    });




    const cardNumberInput = document.querySelector('#cc-name');

    cardNumberInput.addEventListener('input', () => {
      let cardNumber = cardNumberInput.value;
    
      // 숫자 이외의 문자 제거
      cardNumber = cardNumber.replace(/\D/g, '');
    
      cardNumber = cardNumber.replace(/(\d{4})(\d{1,4})(\d{1,4})(\d{1,4})/, '$1-$2-$3-$4');
      cardNumber = cardNumber.slice(0, 19);
    
      cardNumberInput.value = cardNumber; // 입력된 값을 다시 입력 필드에 할당
    });
    

    zipCodeInput.addEventListener('input', () => {
      let zipCodein = zipCodeInput.value;
    
      // 숫자 이외의 문자 제거
      zipCodein = zipCodein.replace(/\D/g, '');
    
      // 최대 5자리까지만 입력되도록 제한
      zipCodein = zipCodein.slice(0, 5);
    
      // 입력 필드에 적용
      zipCodeInput.value = zipCodein;
    });


const phoneNumberInput = document.querySelector('#phone-number');

phoneNumberInput.addEventListener('input', () => {
  let phoneNumber = phoneNumberInput.value;

  // 숫자 이외의 문자 제거
  phoneNumber = phoneNumber.replace(/\D/g, '');

  // 숫자 사이에 간격 추가
  if (/^02/.test(phoneNumber)){
    if (phoneNumber.length > 2 && phoneNumber.length < 7) {
      phoneNumber = phoneNumber.replace(/(\d{2})(\d{1,4})/, '$1-$2');
    }
    if (phoneNumber.length > 6) {
      phoneNumber = phoneNumber.replace(/(\d{2})(\d{1,4})(\d{4})/, '$1-$2-$3');
    }
  }else{
    if (phoneNumber.length > 3 && phoneNumber.length < 8) {
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    }
    if (phoneNumber.length > 7) {
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{1,4})(\d{4})/, '$1-$2-$3');
    }
  }

  // 최대 11자리까지만 입력되도록 제한
  phoneNumber = phoneNumber.slice(0, 13);

  // 입력 필드에 적용
  phoneNumberInput.value = phoneNumber;
});

    


//배송지 별명
const addressNickNameSelect = document.getElementById('inputGroupSelect01');
const saveInfoCheckbox = document.getElementById('save-info');
const shippingNicknameInput = document.getElementById('shipping-nickname');

addressNickNameSelect.addEventListener('change', function(){
  //직접입력 선택시
  if(addressNickNameSelect.value != 0){
    saveInfoCheckbox.disabled = true;
    $("#address").prop('readonly', true);
    $("#zip-code").prop('readonly', true);
  }else{
    saveInfoCheckbox.disabled = false;
    $("#address").prop('readonly', false);
    $("#zip-code").prop('readonly', false);
    delivery_address_nickname = addressNickNameSelect.textContent;
  }
  saveInfoCheckbox.checked=false;
  shippingNicknameInput.disabled = true;
  shippingNicknameInput.value = '';
});

saveInfoCheckbox.addEventListener('change', function() {
  is_address_save = saveInfoCheckbox.checked;
  if (saveInfoCheckbox.checked) {
    shippingNicknameInput.disabled = false;
    delivery_address_nickname = shippingNicknameInput.value;
  } else {
    shippingNicknameInput.disabled = true;
    shippingNicknameInput.value = '';
    delivery_address_nickname = "직접입력";
  }
});

shippingNicknameInput.addEventListener('input',function(){
  if(saveInfoCheckbox.checked){
    delivery_address_nickname = shippingNicknameInput.value;
  }
})





const radioButtons = document.querySelectorAll('[name="btnradio"]');
const inputs = document.querySelectorAll('.payment');
radioButtons.forEach((button, index) => {
    
  button.addEventListener('change', () => {
      //라디오 버튼 선택시 내용 초기화
      inputs.forEach((input) => {
          input.style.display = 'none';
          input.querySelectorAll('input').forEach(cc => {
            cc.required = false;
            cc.value='';
          });
          const formSelects = input.querySelectorAll('.form-select');
          formSelects.forEach((formSelect) => {
              formSelect.selectedIndex = 0;
              formSelect.querySelector('option[selected]').selected = false;
              formSelect.querySelector('option:first-child').selected = true;
          });
      });

      //신용카드 선택시
      if (index === 0) {
          paymentMethodType = "card";
          const ccNameInput = document.getElementById('cc-name-input');
          ccNameInput.style.display = 'flex';
          ccNameInput.querySelectorAll('input').forEach(cc=>{
            cc.required = true;
          });
      //스마트폰 선택시
      } else if (index === 1) {
          paymentMethodType = "phone";
          const phoneNumberInput = document.getElementById('phone-number-input');
          phoneNumberInput.style.display = 'flex';
          phoneNumberInput.querySelector('input').required = true;
      //계좌이체 선택시
      } else if (index === 2) {
          paymentMethodType = "account transfer";
          const cashInput = document.getElementById('cash-input');
          cashInput.style.display = 'flex';
          cashInput.querySelector('input').required = true;
      }
  });
});



//결제하기 버튼 사용시
submitButton.addEventListener('click', () => {

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        //필수 입력 미완료시
        event.preventDefault();
        event.stopPropagation();
        console.log('필수 입력 미완료')
        // 필수 입력 완료시
      }else{
        console.log('서버에 결제요청');
        // 입력된 데이터 가져오기
        const receiver = receiverInput.value;
        const address = addressInput.value;
        const zipCode = zipCodeInput.value;

        // 데이터 객체 생성
        const data = {
          shopper_ID: ID,
          receiver: receiver,
          delivery_address: address,
          delivery_zipCode: zipCode,
          payment_method: paymentMethodType,
          delivery_address_nickname: delivery_address_nickname,
          used_point: used_point,
          delivery_pay: delivery_pay,
          is_address_save: is_address_save,
          earned_point: earned_point
        };

        // AJAX 요청 보내기
        fetch('php/make_order_no.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
          // 성공적으로 데이터 전송되었을 때의 처리 로직
          console.log(response['success']);
        })
        .catch(error => {
          // 데이터 전송 실패 또는 오류 발생 시의 처리 로직
          console.error('Error:', error);
        });
        console.log("결제 요청 완료")
        window.location.href = "order_history.html";
      }

      form.classList.add('was-validated');
    }, false)
  });


});
});
  