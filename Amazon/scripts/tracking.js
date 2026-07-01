import { cart } from '../data/cart-class.js';
import { getOrder, orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderTracking() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    console.log(`Order Id: ${orderId}`);
    console.log(`Product Id: ${productId}`);
    console.log(`Order: ${order}`);
    console.log(`Product: ${product}`);

    let productDetails;
    order.products.forEach((details) => {
        if(details.productId === productId) {
            productDetails = details;
        }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentageProgress = deliveryTime === orderTime ? 100 : Math.min(100, (today - orderTime) / (deliveryTime - orderTime) * 100)

    const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

    let trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>
        
        <div class="delivery-date">
            ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
            <div class="progress-label ${percentageProgress < 50 ? 'current-status' : ''}">
                Preparing
            </div>
            <div class="progress-label ${percentageProgress >= 50 && percentageProgress < 100 ? 'current-status' : ''}">
                Shipped
            </div>
            <div class="progress-label ${percentageProgress === 100 ? 'current-status' : ''}">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentageProgress}%"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

renderTracking();
cart.updateCartQuantity();