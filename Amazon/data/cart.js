export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
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

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const cartQuantityAmazonElement = document.querySelector('.js-cart-quantity');
    if(cartQuantityAmazonElement && cartQuantity) {
        cartQuantityAmazonElement.innerHTML = cartQuantity;
    }

    const cartQuantityCheckoutElement = document.querySelector('.cart-quantity-checkout');
    if(cartQuantityCheckoutElement) {
        cartQuantityCheckoutElement.innerHTML = `${cartQuantity} items`;
    }
}

export function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    updateCartQuantity();
    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
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