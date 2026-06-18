import { cart } from "../data/cart-class.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/backend-practice.js';

renderOrderSummary();
renderPaymentSummary();
cart.updateCartQuantity();