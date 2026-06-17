function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },

        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

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
        },

        removeFromCart(productId) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
            

            this.saveToStorage();
        },

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
        },

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
        },

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
    };
    
    return cart;
}

const cart = Cart('cart-oops');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);