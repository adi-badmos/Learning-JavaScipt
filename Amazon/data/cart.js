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
            quantity
        });
    }

    saveToStorage();
}

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem ) => {
        cartQuantity += cartItem.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = cartQuantity;
}

export function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveToStorage();
}