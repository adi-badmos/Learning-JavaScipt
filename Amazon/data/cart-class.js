class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, quantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if(matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
        
        this.saveToStorage();
    }

    updateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
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

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if(newQuantity === 0) {
            this.removeFromCart(productId);
        }

        if(matchingItem) {
            matchingItem.quantity = newQuantity;
        }

        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

// const cart = new Cart();
// cart.localStorageKey = 'cart-oop';

// const businessCart = new Cart();
// businessCart.localStorageKey = 'cart-business';

// cart.loadFromStorage();
// businessCart.loadFromStorage();

// Using constructor
export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}