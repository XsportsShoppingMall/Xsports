var page = 1;
$(document).ready(async function(){
  const url = `php/get_user_id.php`
  fetch(url)
  .then(response => response.text())
  .then(async member_id => {
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
            <span class="text-body-secondary"><strong class="cart-use-point">0 p</strong></span>
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
      `
    $(".use-point").change(function() {
        console.log(value)
        $(".cart-use-point").textContent = this.value;
    });
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
      $(".total_price").text((total+2500).toLocaleString());
    })
    
})

$(document).ready(function() {
    $(".btn-check").change(function() {
      const selectedRadio = $(this).attr("id");
  
      // 모든 입력 필드의 required 속성 제거
      $(".needs-validation input[required]").removeAttr("required");
  
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
  
    $(".submit").click(() => {
        console.log("submit");
        const addressInputs = $(".needs-validation input[required]");
    
        let allInputsValid = true;
    
        addressInputs.each(function() {
          const input = $(this);
          if (!input[0].checkValidity()) {
            allInputsValid = false;
            return false; // each 루프 종료
          }
        });
    
        if (allInputsValid) {
          console.log("모든 주소 입력 항목이 유효합니다.");
          // 유효한 폼 제출을 위한 추가 코드나 동작을 여기에 추가하세요.
          // 예를 들어, $(".needs-validation").submit()을 사용하여 JavaScript로 폼을 수동으로 제출할 수 있습니다.
    
          // 결제 완료 알림 표시
          alert("결제가 완료되었습니다. 확인 버튼을 클릭하면 페이지를 이동합니다.");
    
          // index.html 페이지로 이동
          window.location.href = "http://localhost:8080/src/index.html";
        } else {
          console.log("유효하지 않은 주소 입력 항목이 발견되었습니다.");
          // 유효하지 않은 주소 입력 항목이 있을 때의 디폴트 문구를 알림창에 추가
          alert("주소 입력 항목을 모두 올바르게 작성해주세요.");
        }
      });
    });
  