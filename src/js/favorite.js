

function add_favorite(product){
    fetch("php/get_user_id.php")
    .then(response => response.text())
    .then(member_id => {
        fetch(`php/add_favorite.php?member_id=${member_id}&product_no=${product.product_no}`)
    });
}

function delete_favorite(product){
    fetch("php/get_user_id.php")
    .then(response => response.text())
    .then(member_id => {
        fetch(`php/delete_favorite.php?member_id=${member_id}&product_no=${product.product_no}`)
    });
}
loadWishes();
async function loadWishes(){
    const wishes = document.querySelector("#wishes");
    wishes.innerHTML = ``;
    fetch("php/get_user_id.php")
    .then(response => response.text())
    .then(member_id => {
        fetch(`php/get_favorite.php?member_id=${member_id}`)
        .then(response => response.json())
        .then(items => {
            items.forEach(item =>{
                fetch(`php/get_modal_product.php?productID=${item.product_no}`)
                .then(response => response.json())
                .then(product => {
                    const wishitem = document.createElement('tr');
                    wishitem.classList.add("wishImg");
                    wishitem.innerHTML =`
                        <td class="wishImg">    
                                <a href ="sub.html"> <img src=${product.represent_imageURL} alt="청송사과"></a>
                            </td>
                            <td class="wishInfo">
                                <span class="wishTitle">${product.name}</span> <br>
                                <span class="wishPrice">${product.price.toLocaleString()}</span>원
                            </td>
                            <td class="wishBtns">
                                <button id =${product.product_no} class="deleteWish wish1">삭제</button> <br>
                                <button type = "button" class="addCart wish1 openCartModal">
                                <span class="material-symbols-outlined cartIcon">shopping_cart</span>
                                <span class="addText .openCartModal">담기</span>
                            </button>
                        </td>
                    `
                    wishes.appendChild(wishitem);
                    console.log(wishes);
                    console.log(wishitem);
                    $(`#${product.product_no}`).click(()=>{
                        delete_favorite(product) 
                        .then(location.reload(true))
                        .then(()=> {loadWishes();});
                       
                    })

                    const openModalButton = wishitem.querySelector('.openCartModal');
                    
                    checkLoginStatus('cart', openModalButton);

                    openModalButton.addEventListener('click', () => {
                        getProductInfo(product.product_no)
                            .then(product => {
                            updateModal(product);
                            openModal(product);
                        });
                    });
                });
                
            });
        });
    });
}