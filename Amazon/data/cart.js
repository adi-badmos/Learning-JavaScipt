let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const cartQuantityAmazonElement = document.querySelector('.js-cart-quantity');
    if(cartQuantityAmazonElement && cartQuantity) {
        cartQuantityAmazonElement.innerHTML = cartQuantity;
    }

    const itemQuantityCheckoutElement = document.querySelector('.item-quantity-checkout');
    const cartQuantityCheckoutElement = document.querySelector('.cart-quantity-checkout');
    if(cartQuantityCheckoutElement) {
        cartQuantityCheckoutElement.innerHTML = `${cartQuantity} items`;
    }
    if(itemQuantityCheckoutElement) {
        itemQuantityCheckoutElement.innerHTML = `Items (${cartQuantity}):`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    
    saveToStorage();
}

function updateQuantity(productId, newQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(newQuantity === 0) {
        removeFromCart(productId);
    }

    if(matchingItem) {
        matchingItem.quantity = newQuantity;
    }

    saveToStorage();
}

function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}