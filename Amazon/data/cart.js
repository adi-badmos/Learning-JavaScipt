export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, addValue) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(matchingItem) {
        matchingItem.quantity += addValue;
    } else {
        cart.push({
            productId: productId,
            quantity: addValue
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