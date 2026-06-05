const addCart = document.querySelector('.add-to-cart');
const alertElement = document.querySelector('.alert');
const dispCart = document.querySelector('.display-cart-quantity');

let cartQuantity = 0;

displayCart();

function displayCart(message = `<br>`) {
    alertElement.innerHTML = message;
    dispCart.innerText = `Cart Quantity: ${cartQuantity}`;
}

function updateCartQuantity(operation, quantity) {
    let message = `<br>`;

    if(operation === 'add') {
        if(cartQuantity + quantity > 10) {
            message = 'The cart is full!';
        } else {
            cartQuantity += quantity;
        }
    } else if(operation === 'subtract') {
        if(cartQuantity < quantity) {
            message = 'Not enough items in the cart!';
        } else {
            cartQuantity -= quantity;
        }
    } else {
        message = 'Invalid operation!';
    } displayCart(message);
}