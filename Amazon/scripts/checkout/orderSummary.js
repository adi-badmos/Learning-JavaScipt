import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderOrderSummary() {
    let cartSummaryHTML = ``;

    // Generating HTML
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryDate}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
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
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let deliveryOptionHTML = ``;
        
        deliveryOptions.forEach(deliveryOption => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            ).format('dddd, MMMM D');

            const price = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
            
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            deliveryOptionHTML += `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${deliveryDate}
                        </div>
                        <div class="delivery-option-price">
                            ${price} Shipping
                        </div>
                    </div>
                </div>
            `;
        }); return deliveryOptionHTML;
    }

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
        
        updateQuantity(productId, Number(newInput));
        updateCartQuantity();
        renderOrderSummary();
        renderPaymentSummary();
    }

    document.querySelectorAll('.save-quantity-link')
        .forEach((saveLink) => {
            saveLink.addEventListener('click', () => {
                const { productId } = saveLink.dataset;

                saveQuantity(productId);
                updateCartQuantity();
            });
        });

    document.querySelectorAll('.quantity-input')
        .forEach((saveInput) => {
            saveInput.addEventListener('keydown', (event) => {
                if(event.key === 'Enter') {
                    const { productId } = saveInput.dataset;

                    saveQuantity(productId);
                    updateCartQuantity();
                }
            });
        });

    // When delete button is clicked, remove the product from the cart and update the HTML
    document.querySelectorAll('.js-delete-link')
        .forEach((deleteLink) => {
            deleteLink.addEventListener('click', () => {
                const { productId } = deleteLink.dataset;
                removeFromCart(productId);

                renderOrderSummary();
                renderPaymentSummary();
                updateCartQuantity();
            });
        });

    updateCartQuantity();

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);

                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}