import { updateCartQuantity } from "../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-oop.js';

renderOrderSummary();
renderPaymentSummary();
updateCartQuantity();