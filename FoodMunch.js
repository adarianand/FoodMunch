
function display(sectionId) {

    document.querySelectorAll('[id^="section"]').forEach(section => section.classList.add('d-none') );
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
}

let storedc = localStorage.getItem("cart");
let cart = JSON.parse(storedc) || [];
updateCartUI();
function addToCart(itemName, itemPrice) {
    const clickedButton = window.event ? window.event.currentTarget : null;
    
    let existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }

    updateCartUI();
    localStorage.setItem("cart", JSON.stringify(cart));

    if (clickedButton) {
        clickedButton.classList.remove("cart-added");
        void clickedButton.offsetWidth;
        clickedButton.classList.add("cart-added");
    }
}


function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartUI();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

   
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-muted m-0">Your cart is empty.</p>`;
        cartTotal.innerText = "0";
        return;
    }
    
  
    let html = '<ul class="list-group list-group-flush">';
    let grandTotal = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-secondary px-0">
                <div>
                    <h6 class="m-0">${item.name}</h6>
                    <small class="text-warning">₹${item.price} x ${item.quantity}</small>
                </div>
                <div class="d-flex align-items-center">
                    <span class="fw-bold me-3">₹${itemTotal}</span>
                    <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="removeFromCart('${item.name}')">✕</button>
                </div>
            </li>
        `;
    });

    html += '</ul>';
    cartItemsContainer.innerHTML = html;
    cartTotal.innerText = grandTotal;
}