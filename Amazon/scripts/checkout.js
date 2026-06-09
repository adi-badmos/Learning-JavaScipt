import { cart, removeFromCart, updateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = ``;

// Generating HTML
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <input class="quantity-input opacity-added quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        <span class="save-quantity-link link-primary opacity-added" data-product-id="${matchingProduct.id}">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});

// Using the generated HTML
document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

// When update button is clicked, update the quantity of the product.
document.querySelectorAll('.js-update-link')
    .forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const { productId } = updateLink.dataset;
            document.querySelector(`.js-cart-item-container-${productId}`)
                .classList.add('is-editing-quantity');
        });
    });

function saveQuantity(productId) {
    document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
    
    const newInput = document.querySelector(`.quantity-input-${productId}`).value;
    if(newInput === '' || Number(newInput) < 0) {
        return;
    }
    
    document.querySelector(`.js-quantity-label-${productId}`)
        .innerText = Number(newInput);
    updateQuantity(productId, Number(newInput));
    updateCartQuantity();
}

document.querySelectorAll('.save-quantity-link')
    .forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
            const { productId } = saveLink.dataset;

            saveQuantity(productId);
        });
    });

document.querySelectorAll('.quantity-input')
    .forEach((saveInput) => {
        saveInput.addEventListener('keydown', () => {
            if(event.key === 'Enter') {
                const { productId } = saveInput.dataset;

                saveQuantity(productId);
            }
        });
    });

// When delete button is clicked, remove the product from the cart and update the HTML
document.querySelectorAll('.js-delete-link')
    .forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const { productId } = deleteLink.dataset;
            removeFromCart(productId);
        });
    });

updateCartQuantity();