function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

let order = [];
let totalPrice = 0;

function addItem(name, price, qtyId) {
    const qty = document.getElementById(qtyId).value;
    if (qty > 0) {
        const itemTotal = price * qty;
        order.push({ name, price, qty, itemTotal });
        updateTable();
    }
}

function updateTable() {
    const tbody = document.querySelector('#order-summary tbody');
    tbody.innerHTML = '';
    totalPrice = 0;
    order.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs.${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>Rs.${item.itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
        totalPrice += item.itemTotal;
    });
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function removeItem(index) {
    order.splice(index, 1);
    updateTable();
}

function saveFavourite() {
    localStorage.setItem('favouriteOrder', JSON.stringify(order));
    alert('Favourite order saved!');
}

function applyFavourite() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        order = favouriteOrder;
        updateTable();
    } else {
        alert('No favourite order found!');
    }
}

function buyNow() {
    // Save the order and total to local storage
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('total', totalPrice.toFixed(2));

    // Redirect to the new page
    window.location.href = 'orderSummary.html';
}
// Load order and total from local storage
const LoadOrder = JSON.parse(localStorage.getItem('order')) || [];
const total = localStorage.getItem('total') || 0;

document.getElementById('order-details').innerText = 'Items: ' + LoadOrder.map(item => `${item.qty} x ${item.name}`).join(', ');
document.getElementById('total-price').innerText = 'Total Price: Rs.' + parseFloat(total).toFixed(2);

function pay() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address= document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zip-code').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvc = document.getElementById('card-cvc').value;

    if (firstName && lastName && phone && email && address && city && state && zipCode && deliveryDate && deliveryTime && cardNumber && cardExpiry && cardCvc) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        const formattedDate = deliveryDate.toDateString();
        alert(`Thank you for your purchase! Your order will be delivered by ${formattedDate}.`);
    } else {
        alert('Please fill out all the fields.');
    }
}