// --------------------
// MODAL HANDLING
// --------------------

// Get modals
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const paymentModal = document.getElementById('payment-modal');

// Get buttons
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Get close buttons
const closeBtns = document.getElementsByClassName('close-btn');

// Show modals
loginBtn.onclick = () => loginModal.style.display = 'block';
registerBtn.onclick = () => registerModal.style.display = 'block';

// Hide modals when close button is clicked
for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    };
}

// Hide modals when clicking outside of the modal
window.onclick = (event) => {
    if (event.target == loginModal || event.target == registerModal || event.target == cartModal || event.target == paymentModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        cartModal.style.display = 'none';
        paymentModal.style.display = 'none';
    }
};

// --------------------
// CURRENCY CONVERTER
// --------------------

// Get currency selector and price elements
const currencySelect = document.getElementById('currency');
const prices = document.querySelectorAll('.price');

const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    VES: 120,
};

// Update prices when currency is changed
currencySelect.addEventListener('change', () => {
    const currency = currencySelect.value;
    prices.forEach(price => {
        const usdPrice = price.getAttribute('data-price-usd');
        const newPrice = (usdPrice * exchangeRates[currency]).toFixed(2);
        price.textContent = `${newPrice} ${currency}`;
    });
});

// --------------------
// SHOPPING CART
// --------------------

// Get shopping cart elements
const cartIcon = document.getElementById('cart-icon');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Show cart modal when cart icon is clicked
cartIcon.onclick = () => cartModal.style.display = 'block';

// Add item to cart when "Add to Cart" button is clicked
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        const price = button.getAttribute('data-price');
        cart.push({ service, price });
        updateCart();
    });
});

// Update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<p>${item.service} - $${item.price}</p>`;
        cartItemsContainer.appendChild(itemElement);
        total += parseInt(item.price);
    });
    cartTotal.textContent = `$${total}`;
}

// --------------------
// PAYMENT SYSTEM
// --------------------

// Get payment system elements
const checkoutBtn = document.getElementById('checkout-btn');
const paymentTotal = document.getElementById('payment-total');
const upfrontPayment = document.getElementById('upfront-payment');
const installmentPayment = document.getElementById('installment-payment');

// Show payment modal when checkout button is clicked
checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    paymentModal.style.display = 'block';
    const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
    paymentTotal.textContent = `$${total}`;
    upfrontPayment.textContent = `$${(total * 0.6).toFixed(2)}`;
    installmentPayment.textContent = `$${(total * 0.2).toFixed(2)}`;
});

// --------------------
// INVOICE GENERATION
// --------------------

// Get invoice generation elements
const printInvoiceBtn = document.getElementById('print-invoice-btn');

// Print invoice when "Print Invoice" button is clicked
printInvoiceBtn.addEventListener('click', () => {
    const invoice = window.open('', 'Print Invoice', 'height=600,width=800');
    invoice.document.write('<html><head><title>Invoice</title>');
    invoice.document.write('<link rel="stylesheet" href="style.css">');
    invoice.document.write('</head><body>');
    invoice.document.write('<h1>Invoice</h1>');
    invoice.document.write('<h2>WebSite Kike</h2>');
    invoice.document.write('<hr>');
    invoice.document.write('<h3>Services Purchased:</h3>');
    cart.forEach(item => {
        invoice.document.write(`<p>${item.service} - $${item.price}</p>`);
    });
    invoice.document.write('<hr>');
    const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
    invoice.document.write(`<p><strong>Total:</strong> $${total}</p>`);
    invoice.document.write(`<p><strong>Upfront Payment (60%):</strong> $${(total * 0.6).toFixed(2)}</p>`);
    invoice.document.write(`<p><strong>Installment Payment (20%):</strong> $${(total * 0.2).toFixed(2)}</p>`);
    invoice.document.write('</body></html>');
    invoice.document.close();
    invoice.print();
});
