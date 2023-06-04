const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_no = urlParams.get('product_id');
console.log(product_no); // 선택한 상품의 아이디 출력

fetch("php/get_modal_product.php?product_no="+product_no)
.then(response => response.json())
.then(product=>{
    const product_name = querySelector("#productName")
    const price = querySelector("#price")
    const image = 
    product_name.textContent = product.name;
    price.textContent = product.price;
})



