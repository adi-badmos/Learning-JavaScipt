import { getProduct, loadProductsFetch } from '../data/products.js';
import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function productsListHTML(order) {
    let productsHTML = '';

    order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);

        productsHTML += `
            <div class="product-image-container">
                <img src=${product.image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(product.estiatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
        `
    });

    return productsHTML;
}

async function renderOrders() {
    await loadProductsFetch();

    let ordersHTML = '';
    orders.forEach(order => {
        const orderTime = dayjs(order.orderTime).format('MMMM D');
        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${productsListHTML(order)}
                </div>
            </div>
        `
    });

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

renderOrders();