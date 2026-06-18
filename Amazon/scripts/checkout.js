import { cart, loadCartFetch } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

async function loadPage() {
    try {
        // throw 'error 1';
        await loadProductsFetch();
        await loadCartFetch();

    } catch(error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
    cart.updateCartQuantity();
}

loadPage();

// await Promise.all([
//     loadProductsFetch(),
//     loadCartFetch()
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     cart.updateCartQuantity();
// })

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