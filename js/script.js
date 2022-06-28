const addToCartButton = document.querySelectorAll('.add-to-cart');
const cartOrder = document.querySelector('.cart-orders');
let amount = document.querySelector('.amount')

window.onload = function updateCart() {
    let valueForVisible = localStorage.getItem('newProduct');
    cartOrder.style.display = valueForVisible;
};

$(document).ready(function() {
    if (document.body.classList.contains('checkout')) {
       itemsToCart();
       removeFromCart();
       submitFormular();
       clearInputs();
    } 
});

increaseAmount()

/* ADD ITEMS TO CART AND TO LOCAL STORAGE */

for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener('click', addToCart)
}

function increaseAmount() {
    let reduceAmount = document.querySelector('.remove-item');
    let addAmount = document.querySelector('.add-item');
    if(!addAmount) return
    addAmount.addEventListener('click', () => {amount.innerText++});
    reduceAmount.addEventListener('click', () => {
        if (amount.innerText == 1) return;
        amount.innerText--;
    });
}

function addToCart(event) {
    let button = event.target;
    let productItem = button.parentElement.parentElement.parentElement;
    let itemPrice = productItem.getElementsByClassName('item-price')[0]; 
    let productName = productItem.getElementsByClassName('product-name')[0].innerText;
    let productImgSrc = productItem.getElementsByTagName('img')[0].src;
    let productPrice = parseFloat(itemPrice.innerText.replace('$', ''));
    let productAmount = amount.innerText;

    saveToStorage(productName, productImgSrc, productPrice, productAmount);
}

function saveToStorage(name, img, price, amount) {
    localStorage.setItem('itemName', name);
    localStorage.setItem('itemImg', img);
    localStorage.setItem('itemPrice', price);
    localStorage.setItem('itemAmount', amount)
}

function itemsToCart() {
    let itemName = localStorage.getItem('itemName');
    let itemImg = localStorage.getItem('itemImg');
    let itemPrice = localStorage.getItem('itemPrice');
    let itemAmount = localStorage.getItem('itemAmount');

    const shippingPrice = 50;
    let summaryUl = document.getElementById('summary-ul');

    if (itemName == null) return

    let productLi = document.createElement('li');
    productLi.classList.add('summary-li');   
    let productLiContent = `
        <div class="wrapper">
            <div class="item-wrapper">
                <img src="${itemImg}" alt="">
                <div class="about-item">
                <h5>${itemName}</h5>
                <span class="item-value">$${itemPrice}</span>
                </div>
            </div>
            <span class="item-count">${itemAmount}</span>
        </div>`
    
    productLi.innerHTML = productLiContent;
    summaryUl.append(productLi);
    
    updateFinalPrice(itemPrice, itemAmount, shippingPrice)
}

/* FINAL PRICE */

function updateFinalPrice(price, amount, shippingPrice) {
    const total = document.getElementById('total-cost');
    if ('itemName' in localStorage) total.innerText = '$' + ((price * amount) + shippingPrice);
}

/* CART ICON CIRCLE VISIBLE */

for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener('click', () => {
        let visibleOrder = cartOrder.style.display = 'block';
        localStorage.setItem('newProduct', visibleOrder);
    });
}

/* REMOVE ITEMS FROM CART AND UPDATE IT'S PRICE*/

function removeFromCart() {
    let productList = document.querySelectorAll('.summary-li');
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        product.addEventListener('click', () => {
            product.remove();
            localStorage.clear();
            window.location.reload();
        });
    }
}

/* FORMULAR VALIDATION */

const userName = document.getElementById('name');
const userMail = document.getElementById('mail');
const userPhone = document.getElementById('phone');
const userAddress = document.getElementById('address');
const userZip = document.getElementById('zip');
const userCity = document.getElementById('city');
const userEmoney = document.getElementById('money-num');
const userPin = document.getElementById('e-pin');
const submitButton = document.getElementById('pay-button');

function submitFormular() {
    submitButton.addEventListener('click', (ev) => {
        checkFormular();
        ev.preventDefault();
    });
}


function checkFormular() {
    let name = userName.value;
    let mail = userMail.value;
    let phone = userPhone.value;
    let address = userAddress.value;
    let zip = userZip.value;
    let city = userCity.value;
    let emoney = userEmoney.value;
    let pincode = userPin.value;


    if (name === '') {
        invalidInput(userName, "Username can't be blank");

    } else {
        success(userName);
    }


    const validMail = (mail) => {
        return mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
    if (validMail(mail)) {
        success(userMail);
    } else if (mail === ''){
        invalidInput(userMail, "Email can't be blank");
    } else {
        invalidInput(userMail, 'Email is not valid');
    }


    const validPhone = (phone) => {
        return phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    }
    if (validPhone(phone)) {
        success(userPhone);
    } else if (phone === '') {
        invalidInput(userPhone, "Phone number can't be blank");
    } else {
        invalidInput(userPhone, 'Phone number is not valid');
    }


    if (address === '') {
        invalidInput(userAddress, "Address can't be blank");
    } else {
        success(userAddress);
    }


    const validZipCode = (zip) => {
        return zip.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    }
    if (validZipCode(zip)) {
        success(userZip);
    } else if (zip === '') {
        invalidInput(userZip, "Zip code can't be blank");
    } else {
        invalidInput(userZip, 'Zip code is not valid');
    }


    if (city === '') {
        invalidInput(userCity, "City can't be blank");
    } else if(!isNaN(city)) {
        invalidInput(userCity, 'City is not valid');
    } else {
        success(userCity);
    }


    if (emoney === '') {
        invalidInput(userEmoney, "E-money number can't be blank");
    } else if (isNaN(emoney)) {
        invalidInput(userEmoney, 'E-money number is not valid');
    } else {
        success(userEmoney)
    }


    if (validZipCode(pincode)) {
        success(userPin);
    } else if (pincode === '') {
        invalidInput(userPin, "Pin code can't be blank");
    } else {
        invalidInput(userPin, 'Pin code is not valid');
    }
}

function invalidInput (input, message) {
    input.value = message;
    input.classList.add('error');
}

function success(input) {
    input.classList.add('success');
}

function clearInputs() {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.addEventListener('click', () => {
            input.value = '';
        });
    }
}

/* RESPONSIVE NAV */

const nav = document.getElementById('responsive-nav');
const navButton = document.querySelector('.responsive-btn');
const navToggler = document.querySelector('.nav-toggler');
navButton.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    navToggler.classList.toggle('active');
});

