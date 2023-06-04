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
    const itemContainer = document.querySelector(".cart_list");
    var it = 0;
    itemContainer.innerHTML = `
      <li>
        <div class="checkbox">
            <input type="checkbox" name="all_chk" id="all_chk">
            <label for="all_chk">전체선택</label>
        </div>
        <div class="del_btn">삭제 (<span class="num">0</span>)</div>
      </li>
      `;

    items.forEach(item => {
      const product_image = item.represent_imageURL;
      it += 1;
      const vari = it;
      const quantity = item.product_quantity
      console.log(item.product_quantity);
      
      

      const item_list = document.createElement('li');
      // productCard.classList.add('checkbox');
      item_list.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" name="item_chk" class="item_chk0${vari}">
          <label for="item_chk0${vari}"></label>
        </div>
        
        <div class="item_detail">
          <img src="${product_image}">
          <p class="name"><strong>"${item.name}"</strong></p>
          <p class="options ms-5">
            <div class="ms-5">${item.size}</div>
            <div class="ms-5">${item.color}</div>
            <div class="ms-5">${item.other_option}</div>
          </div>
        </div>
        <div class="opt_info d-flex">
            <strong class="price_unit col-4">${item.price_change.toLocaleString()+"원"}</strong>
            <div class="price_btn col-5">
                <input type="button" value="-" class="minus_btn">
                <input type="text" value="${quantity}" class="number">
                <input type="button" value="+" class="plus_btn">
            </div>
            <div class="total_p col-6">
                <strong class="price_amount">${(item.price_change * quantity).toLocaleString()+"원"}</strong>
                <span class="del_li_btn"><img src="https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/btn_del_circle.svg"></span>
            </div>
        </div>
      `;
      
      itemContainer.appendChild(item_list);
      console.log(item_list);
      console.log(itemContainer);
      
      })})
    })




  //전체 선택 클릭시 
await $('#all_chk').change(function () {
    if($("#all_chk").is(":checked")){
      $("input[name=item_chk]").prop("checked",true);
    }else{
      $("input[name=item_chk]").prop("checked",false);
    }
    // 전체 체크 순회(체크 확인)
    var check_cnt=0;
    $("input:checkbox[name=item_chk]").each(function() {
       if($("input:checkbox[name=item_chk]").is(":checked") == true){
          check_cnt++;
          //console.log(check_cnt)      
       }
    });
    $('.del_btn .num').text(check_cnt);
  });

 await $('input[name="item_chk"]').change(function () {

  var itemLength = $('input[name="item_chk"]').length;
  var checkedLength = $('input[name="item_chk"]:checked').length;
  var selectAll = (itemLength == checkedLength);
  //console.log(checkedLength);

  $('.del_btn .num').text(checkedLength);
  $('#all_chk').prop('checked', selectAll);

  });

 $('.price_btn input[type="button"]').on('click', function(){
     var $ths = $(this);
     var $par = $ths.parent().parent();
     var $obj = $par.find('input[type="text"]');
     var val = $obj.val();
     if ($ths.val()=='-') {
         if (val > 1)
             $obj.val(--val);
     }
     else if ($ths.val()=='+') {
         if (val < 30)
             $obj.val(++val);
     }
 
   //수량 변경
   var unit_amount=$par.find('.price_unit').text().replace(/[^0-9]/g,"");
   var quantity = val;
   // 결제 수량 변경 로직은 메인터너스의 편리성을 위해서 밖으로 빼서 처리함.
   //1단 세로 부분 결제 금액
   pay_unit_func($par,unit_amount,quantity);
   //2단 결제 금액
   pay_total_func();
 });

function pay_unit_func($par,unit_amount,quantity){
  //1번 단
  var unit_total_amount=$par.find('.price_amount').text((unit_amount*quantity).toLocaleString());
} 

function pay_total_func(){
  //2번 단 
  var amount_total=0;
  var converse_unit=0;
  $('.cart_list li').each(function() {
    //console.log($(this).find('.price_amount').text());
    converse_unit=$(this).find('.price_amount').text().replace(/[^0-9]/g,"");
    amount_total=amount_total+(parseInt(converse_unit)|| 0);
    //총 상품금액
    //console.log(amount_total);
  });
  //총 상품금액
  //var total_amount_money = $('.cart_total_price').children().find('.item_price').text();
  var total_amount_money =$('.cart_total_price').children().find('.item_price').text(amount_total.toLocaleString());
  //할인금액
  var total_sale_money = parseInt($('.cart_total_price').children().find('.sale_price').text().replace(/[^0-9]/g,"")|| 0);
  console.log(total_sale_money);
  //총 배송비
  var total_delivery_price = parseInt($('.cart_total_price').children().find('.delivery_price').text().replace(/[^0-9]/g,"")|| 0);
  console.log(total_delivery_price);
  //총 결제금액
  var total_price=(parseInt(amount_total|| 0)-total_sale_money+total_delivery_price);
  var total_total_price = $('.cart_total_price').children().find('.total_price').text(total_price.toLocaleString());
  
}

 //개별 아이템 삭제
 $('.del_li_btn').on('click', function(){
   var recent_delete_cnt=$('.del_btn .num').text();
   var check_delete_ck=$(this).offsetParent().parent().find('input[type="checkbox"]').is(':checked');
   console.log(check_delete_ck);
   if(check_delete_ck == true){
     recent_delete_cnt=recent_delete_cnt - 1;
     $('.del_btn .num').text(recent_delete_cnt);
   }
   $(this).offsetParent().parent().remove();
   //console.log($(this).offsetParent().parents().find('input[type="checkbox"]').is(':checked'));
   pay_total_func();
 });
 //삭제 버튼을 누르면 지정된 상품 삭제
 $('.del_btn').on('click', function(){
   var recent_delete_cnt=$('.del_btn .num').text();
   $("input:checkbox[name=item_chk]").each(function() {
        var check_delete_ck=$(this).offsetParent().find('input[type="checkbox"]').is(':checked');
        console.log(check_delete_ck);
        if(check_delete_ck == true){
          recent_delete_cnt=recent_delete_cnt - 1;
          $('.del_btn .num').text(recent_delete_cnt);
          $(this).offsetParent().remove();
        }
    });
    pay_total_func();
 }); 
});