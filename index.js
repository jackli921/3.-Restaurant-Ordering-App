import {menuArray, modifyMenuArray} from './data.js'

let totalPrice = 0;
let pizzaPriceCount = 0;
let hamburgerPriceCount = 0;
let beerPriceCount = 0;

function getMenuHtml(){
    let menuHtml = ``

    menuArray.forEach(function(item){
    menuHtml +=
    `
    <div class = "container">
    
        <div class = "item-card">
        
            <div class="item-pic">
                <p><span class="emoji item-object">${item.emoji}</span></p>
            </div>
    
            <div class = "text-container item-object">
                <p class="name">${item.name}</p>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            
            <div class = "add-btn-container item-object">  
                <button class = "add-btn" id="add-btn-${item.id}" data-item="${item.id}">+</button>
            </div>
            
        </div>
        
    </div>

    
    `
    })
    
    let orderModalHtml =``
    orderModalHtml =
    `
    <div class="order-summary-modal hidden" id="order-summary-modal">
        <h1 class="modal-title centered">Your Order</h1>
        <div class="order-item">
            <p class="name">Pizza<span class="remove-btn" id="remove-btn-1" data-remove = "Pizza">Remove</span></p>
            <p class="price" id="pizza-price">0</p>
        </div>
        <div class="order-item">
            <p class="name">Hamburger<span class="remove-btn" id="remove-btn-2" data-remove = "Hamburger">Remove</span></p>
            <p class="price" id="hamburger-price">0</p>
        </div>
        <div class="order-item">
            <p class="name">Beer<span class="remove-btn" id=remove-btn-3" data-remove = "Beer">Remove</span></p>
            <p class="price" id="beer-price">0</p>
        </div>
        
        <div class="total-price-container"> 
            <p class ="name">Total Price:</p>
            <p class="price" id="total-price">0</p>
        </div>
        
        <div class="order-btn centered">
            <button class="btn-primary order-btn" id="order-btn">Complete Order</button>
        </div>
    </div>

    `
    menuHtml += orderModalHtml
    

    let paymentModal = ``
    paymentModal =
    `
    <div class="payment-modal centered hidden" id="payment-modal">
        <h1>Enter Card Details</h1>
        <form id="payment-form">
            <input type=text required placeholder="Enter Your Name" name="username"aria-label="name">
            <input type=number required placeholder="Enter card Number" name="card-number  "aria-label="number">
            <input type=password required placeholder="Enter CVV" name="card-password" aria-label="password">
            <button class="btn-primary pay-btn" id="pay-btn">Pay</button>
        </form>
    </div>
    `
    menuHtml += paymentModal
        
        let thankYouModal = ``
        thankYouModal =
        `
        <div class="thank-you-modal" id="thank-you-modal">
            <p class="thank-you-text" id="thank-you-text"></p>  
        </div>
        `
        
        menuHtml +=thankYouModal
    return menuHtml
}

// check if add button has been clicked
document.addEventListener('click',function(e){
    if(e.target.dataset.item){
        displayOrderSummaryModal(e.target.dataset.item)
        handleAddBtn(e.target.dataset.item)
    }
    
     if (e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }
    
    if (e.target.id === "order-btn"){
        handleOrderBtn()
    }

})

function displayOrderSummaryModal(itemId){
    document.getElementById('order-summary-modal').style.display = "block"  
}
 
function handleRemoveBtn(itemId){
   if (itemId === "Pizza"){
       totalPrice -= pizzaPriceCount
       pizzaPriceCount = 0
       document.getElementById('pizza-price').innerHTML = "$"+`${pizzaPriceCount}`
       document.getElementById('total-price').innerHTML = "$"+`${totalPrice}`
   }
   else if(itemId === "Hamburger"){
       totalPrice -= hamburgerPriceCount
       hamburgerPriceCount = 0
       document.getElementById('hamburger-price').innerHTML = "$"+`${hamburgerPriceCount}`
       document.getElementById('total-price').innerHTML = "$"+`${totalPrice}`
   }
   else if(itemId === "Beer"){
       totalPrice -= beerPriceCount
       beerPriceCount = 0
       document.getElementById('beer-price').innerHTML = "$"+`${beerPriceCount}`
       document.getElementById('total-price').innerHTML = "$"+`${totalPrice}`
   }
 
}

 
function handleAddBtn(itemId){

    // select the entire object by using the object id data attribute stored in each button
    const targetItem = menuArray.filter(function(item){
        return item.id === itemId           
    })[0]
    
    // add the price of seleceted item to total price

    
    // check for appropriate selected item object and add their price to total
    if (targetItem.name === "Pizza"){
        pizzaPriceCount += targetItem.price
        document.getElementById('pizza-price').innerHTML = "$"+`${pizzaPriceCount}`
    }   
    
    else if (targetItem.name === "Hamburger"){
        hamburgerPriceCount += targetItem.price
        document.getElementById('hamburger-price').innerHTML = "$"+`${hamburgerPriceCount}`
    }
    
    else if (targetItem.name === "Beer"){
        beerPriceCount += targetItem.price
        document.getElementById('beer-price').innerHTML = "$"+`${beerPriceCount}`
    }
     
    totalPrice += targetItem.price
    document.getElementById('total-price').innerHTML = "$"+`${totalPrice}`
       
}

function handleOrderBtn(){  
    if(totalPrice > 0){
        document.getElementById('payment-modal').style.display = "block"
        handlePayBtn()
        
    }
    
}

function handlePayBtn(){
    const paymentForm = document.getElementById('payment-form')
    const payBtn = document.getElementById('pay-btn')

    paymentForm.addEventListener('submit', function(e){
        e.preventDefault()
        const paymentFormData = new FormData(paymentForm)
        const customerName = paymentFormData.get('username')
       
        document.getElementById('payment-modal').style.display ="none"
        document.getElementById('order-summary-modal').style.display ="none"
        
        
        
        render()
        document.getElementById('thank-you-text').innerHTML = `
        Thanks`+` ` +`${customerName}! Your order is on its way!`
        
        document.getElementById('thank-you-modal').style.display = "flex"
        })
    
}


function render(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}

render()