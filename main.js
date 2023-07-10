//cart

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active")
}
// close cart
closeCart.onclick = () => {
    cart.classList.remove("active")
}

// Cart Working js

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


// making function

function ready() {
    // remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
        updatetotal()
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // Add to Cart 
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var  button = addCart[i]
        button.addEventListener('click' , addCartClicked)
    }
}

// Remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}

// Quantity Change
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add to Cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var  title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var  price = shopProducts.getElementsByClassName('price')[0].innerText
    var  productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title , price, productImg)
    updatetotal()
}

function addProductToCart(title , price ,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemNames.length;i++){
        // alert("hello world")
    }
    updatetotal()

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-b ox">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>

    <i class='bx bxs-trash-alt cart-remove'></i> `

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click' , removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change' , quantityChanged) 

updatetotal()
}


// update total 
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        // IF price containt some cents value
        total = Math.round(total *100) / 100
        document.getElementsByClassName('total-price')[0].innerText = '$' + total
    }
}