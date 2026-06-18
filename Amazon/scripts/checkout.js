import { cart, loadCart } from "../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function loadPage() {
    console.log('load page');

    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    renderOrderSummary();
    renderPaymentSummary();
    cart.updateCartQuantity();
}

loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })

// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     cart.updateCartQuantity();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });

// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     cart.updateCartQuantity();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//         cart.updateCartQuantity();
//     });
// });