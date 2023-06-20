const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_no = urlParams.get('product_id');
console.log(product_no); // 선택한 상품의 아이디 출력

 fetch("php/get_modal_product.php?productID="+product_no)
.then(response => response.json())
.then(async product=>{
    console.log(product);
    const product_name = document.querySelector("#productCardName");
    console.log(product_name);
    const price = document.querySelector("#price");
    const product_image =  document.querySelector("#product_image");
    const more_information_image =  document.querySelector("#more_information_image");
    product_name.textContent = product.name;
    price.textContent = (product.price).toLocaleString() + "원";
    product_image.src = product.represent_imageURL;
    more_information_image.src = product.more_information_imageURL;
    
    //별점
    const star_rating_box = document.querySelector("#star-rating");
    console.log(star_rating_box.textContent);
    star_rating_box.innerHTML = `
    <small class="d-flex justify-content-end text-body-secondary">
    ${await generateStarRating(product.product_no)}
    (${await getReviewCount(product.product_no)})
    </small>
    `
    const openModalButton = document.querySelector('.openCartModal');
    console.log(openModalButton);
    const favoriteButton = document.querySelector('.favorite-button');

    // Attach event listener to the button
    checkLoginStatus('cart', openModalButton);

    openModalButton.addEventListener('click', () => {
        openModal(product);
    });
    
    checkLoginStatus('favorite', favoriteButton);

    let isfavorite = false;
    console.log(isfavorite);
    fetch("php/get_user_id.php")
    .then(response => response.text())
    .then(member_id =>{
      fetch(`php/get_favorite.php?member_id=${member_id}`)
      .then(response => response.json())
      .then(items =>{
        items.forEach(item =>{
          if (item.product_no == product.product_no){
            isfavorite = true;
            console.log(isfavorite);
            if(isfavorite){
              favoriteButton.classList.toggle('btn-outline-danger');
            }
          } 
        });
      });
    });
    

    favoriteButton.addEventListener('click', () => {
      getProductInfo(product.product_no)
      .then(product => {
        let isfavorite = false;
        fetch("php/get_user_id.php")
        .then(response => response.text())
        .then(member_id =>{
          fetch(`php/get_favorite.php?member_id=${member_id}`)
          .then(response => response.json())
          .then(items =>{
            items.forEach(item =>{
              console.log(item.product_no);
              console.log(product.product_no);
              
              if (item.product_no == product.product_no){
                console.log('exist');
                isfavorite = true;
              } 
            });
          })
          .then(()=>{
            console.log(isfavorite);
            if(isfavorite){
              delete_favorite(product);
            }else{
              add_favorite(product);
            }
          });
          
        })
        
        
      });
      favoriteButton.classList.toggle('btn-outline-danger');
    });

})



