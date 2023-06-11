$("#more-button1").click(()=>{
    $("#item1-hidden").removeClass("overflow-hidden");
    $("#more-button1").addClass("d-none");
    $("#total1").removeClass("position-absolute");
    $("#item1-hidden").removeAttr("style");
  });

  $(document).ready(() => {
    fetch("php/get_user_id.php")
    .then(response => response.text())
    .then(ID => {
        fetch(`php/get_orders.php?ID=${ID}`)
        .then(response => response.json())
        .then(items => {
            let last_order_number = "-1";
            let current_order_number;
            items.forEach(item => {
                //다음 order 카드 생성
                console.log(last_order_number);
                console.log(item.order_no);
                if(last_order_number != item.order_no){
                    console.log("order add");
                    last_order_number = item.order_no;
                    const orderCard = document.createElement('div');
                    orderCard.classList.add('list-group-item');
                    orderCard.classList.add('lh-sm');
                    orderCard.id = `item${item.order_no}`;
                    let receiv;
                    if(item.receiver == ""){
                        receiv = item.member_name;
                    }else{
                        receiv = item.receiver;
                    }
                    orderCard.innerHTML = `
                        <div class = "row" >
                            <div class = "col-3">
                                <div class = "row d-flex justify-content-between mb-2">
                                    <span>주문번호 : ${item.order_no}</span>
                                </div>
                                <img src=${item.represent_imageURL} class="bd-placeholder-img card-img-top col-3" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="true">   
                            </div>
                            <div class="col-9  position-relative">
                                <ul class="list-unstyled ps-0 overflow-hidden" id = "item${item.order_no}-hidden" style="height:220px">
                                    <li class=" mb-3"><span class= "fs-6">주문일시 : ${item.order_date}</span></li>
                                    
                                    <li class=" mb-3">
                                        <span class= "fs-6">수령인 : ${receiv}</span>
                                        <span class= "fs-6 ms-3">주소 : ${item.delivery_address}</span>
                                    </li>
                                    <hr>
                                    <li class="mb-1">
                                        <div class="card-body ms-2 d-flex justify-content-between">
                                            <div class="left d-inline">
                                            <p>${item.product_name}(${item.product_quantity}개)</p>
                                                <ol class="ms-4 breadcrumb ${item.product_no}">
                                                </ol>
                                            </div>
                                            <div class="right d-inline">
                                            <p>${parseInt(item.unit_price)*parseInt(item.product_quantity)} 원</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            <div class = " position-absolute end-0 start-50" >
                                <button id = "more-button${item.order_no}"type="button" class ="text-secondary border-0 btn-light">더보기</button> 
                            </div>
                        </div>
                        <div class="card-body ms-2 d-flex justify-content-between">
                            <div></div>
                            
                            <div  id="total${item.order_no}" class ="d-flex justify-content-between">
                                <div class="left d-inline me-2">
                                    <p>배송비</p>
                                </div>
                                <div class="right d-inline me-5">
                                    <p>2,500 원</p>
                                </div>
                                <div class="left d-inline me-2">
                                    <p>포인트</p>
                                </div>
                                <div class="right d-inline me-5">
                                    <p>- ${item.used_point} p</p>
                                </div>
                                <div class="left d-inline me-4">
                                    <p>총계</p>
                                </div>
                                <div class="right d-inline">
                                    <p><strong>${item.delivery_pay.toLocaleString()} 원</strong></p>
                                </div>
                            </div>
                        </div>
                        <HR>
                    `;
                    $("#order-list").append(orderCard);
                    $(`#more-button${item.order_no}`).click(()=>{
                        $(`#item${item.order_no}-hidden`).removeClass("overflow-hidden");
                        $(`#more-button${item.order_no}`).addClass("d-none");
                        $(`#total${item.order_no}`).removeClass("position-absolute");
                        $(`#item${item.order_no}-hidden`).removeAttr("style");
                      });

                    if(item.color != ""){
                        const color_option = document.createElement('li'); 
                        color_option.classList.add('breadcrumb-item');
                        color_option.innerHTML=`
                            <small>${item.color+" "}</small>
                        `
                        orderCard.querySelector(".breadcrumb").append(color_option);
                    }

                    if(item.size != ""){
                        const size_option = document.createElement('li'); 
                        size_option.classList.add('breadcrumb-item');
                        size_option.innerHTML=`
                            <small>${item.size+" "}</small>
                        `
                        orderCard.querySelector(".breadcrumb").append(size_option);
                    }

                    if(item.other_option != ""){
                        const other_option_option = document.createElement('li'); 
                        other_option_option.classList.add('breadcrumb-item');
                        other_option_option.innerHTML=`
                            <small>${item.other_option+" "}</small>
                        `
                        orderCard.querySelector(".breadcrumb").append(other_option_option);
                    }
                        

                //같은 주문일 경우
                }else{
                    console.log("item add");
                    const itemList = document.querySelector(`#item${item.order_no}-hidden`);
                    console.log(itemList);
                    const itemCard = document.createElement('li');
                    itemCard.classList.add('mb-1');
                    itemCard.innerHTML=`
                    <li class="mb-1">
                        <div class="card-body ms-2 d-flex justify-content-between">
                            <div class="left d-inline">
                            <p>${item.product_name}(${item.product_quantity}개)</p>
                                <ol class="ms-4 breadcrumb ${item.product_no}">
                                </ol>
                            </div>
                            <div class="right d-inline">
                            <p>${parseInt(item.unit_price)*parseInt(item.product_quantity)} 원</p>
                            </div>
                        </div>
                    </li>
                    `;
                    console.log(itemCard);
                    itemList.appendChild(itemCard);

                    if(item.color != ""){
                        const color_option = document.createElement('li'); 
                        color_option.classList.add('breadcrumb-item');
                        color_option.innerHTML=`
                            <small>${item.color+" "}</small>
                        `
                        itemCard.querySelector(".breadcrumb").append(color_option);
                    }

                    if(item.size != ""){
                        const size_option = document.createElement('li'); 
                        size_option.classList.add('breadcrumb-item');
                        size_option.innerHTML=`
                            <small>${item.size+" "}</small>
                        `
                        itemCard.querySelector(".breadcrumb").append(size_option);
                    }

                    if(item.other_option != ""){
                        const other_option_option = document.createElement('li'); 
                        other_option_option.classList.add('breadcrumb-item');
                        other_option_option.innerHTML=`
                            <small>${item.other_option+" "}</small>
                        `
                        itemCard.querySelector(".breadcrumb").append(other_option_option);
                    }
                        
                }
            })
        });
    });
});