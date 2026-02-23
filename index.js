/* importing menu data from "data.js" */

import { menuArray } from '/data.js'

/* shopping cart array */

let cartArr = []

/* listening for clicks on the menu elements */

document.addEventListener('click', function(e){
    
    const icon = e.target.dataset.add
    
    if(icon){
        e.target.classList.toggle("fa-circle-plus")
        e.target.classList.toggle("fa-circle-minus")
        handledAddButton(Number(icon))
    }
})

/* handling the clicked elements. With this function you match the clicked element with the entire object by its id */ 

function handledAddButton(itemId){
    const handleItemId = menuArray.find(function(item){
        return item.id === itemId
})

/* existence check inside the cart */
    const existingItem = cartArr.find(item => item.id === itemId)
    
/* if the item exists already, it won't be duplicated inside the cart. Id it doesn't, the item is pushed into the cart */
    if (existingItem) {
        cartArr = cartArr.filter(item => item.id !== itemId)
    } else {
        cartArr.push(handleItemId)
}
    renderCart() /*rendering the cart function*/
}

/* menu rendering function */

const menuHtml = menuArray.map(function(item){
    return `
    <section class="menu-item">
        <div class="item-emoji">
            <div class="emoji-img">${item.emoji}</div>
        </div>
        <div class="item-description" id="${item.id}">
            <h3>${item.name}</h3>
            <p class="ingredients">${item.ingredients.join(", ")}</p>
            <p class="price">$${item.price}</p>
        </div>
        <div class="add-button">
            <i class="fa-solid fa-circle-plus fa-2xl" data-add="${item.id}" style="color: rgb(255, 212, 59);"></i>
        </div>
    </section>
    `
}).join(" ")

/* render cart function (it is actually a re-render). If the length of cartArr is 0, then the cart won't be rendered */

function renderCart() {
    if(cartArr.length === 0){
        document.getElementById("cart-section").innerHTML = " "
        return
    }
    
    /* total price calculation */
    const totalPrice = cartArr.reduce((total, item) => total + item.price, 0)
    
    /* cart items rendering */
    const cartiItemsHtml = cartArr.map(function(cartItem){
        return `
        <div class="shopping-cart">
            <h3>${cartItem.name}</h3>
            <p class="price">$${cartItem.price}</p>
        </div>
        `
}).join(" ")

/* rendering the "Your Order" title  + the total price + complete order button. This goes separated from previos rendering since we don't want these elements to be iterated over and duplicated when rendered */
    document.getElementById("cart-section").innerHTML = `
    <div class="title">
        <h1>Your Order</h1>
    </div>
    ${cartiItemsHtml}
    <p class="total">Total: $${totalPrice}</p>
    <button class="order-btn" id="order-btn">COMPLETE YOUR ORDER</button>
    `
/* getting modal-related elements by id from the index.html */
    const orderBtn = document.getElementById("order-btn")
    const modal = document.getElementById("modal")
    const closeBtn = document.getElementById("modal-close-btn")
    
/* event listener for clicks on the orderBtn */
    orderBtn.addEventListener("click", () => {
        modal.style.display = "flex"
    })

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none"
    })
}

const form = document.getElementById("card-details-form")
const modalInner = document.getElementById("modal-inner")

form.addEventListener("submit", function(e){
    e.preventDefault()
    modalInner.innerHTML = `
        <div class="modal-loading">
            <img class="loading-icon" src="/images/loading.gif" alt="loading icon">
        </div>
    `
    setTimeout(function(){
         modal.style.display = "none"
         document.getElementById("container").innerHTML = `
         <div class="thanks-container">
            <h2 class="thank-message">Thank you for ordering with us! You will receive your order in a few minutes 🏍️</h2>
         </div>
         `
    }, 3000)
    
})
/* render app function that waits for the menu and all other elements before are rendered, excepting the cart. This means that it waits for the menuHtml and renders an empty shopping cart until the user clicks on one of the + icons and starts adding items to the handling function */

function renderApp() {
    document.getElementById("container").innerHTML = `
        <div class="app-wrapper">
            <div id="menu-section">
                ${menuHtml}
            </div>
            <div id="cart-section"></div>
        </div>
    `
}

renderApp()

