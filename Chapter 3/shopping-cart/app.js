const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cart-subtotal');
const cartTotall = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const cartItems = [];

let cartTotalValue = 0; // Define cartTotalValue outside the function

// Promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute('data-name');
  const productPrice = parseFloat(button.getAttribute('data-price'));

  const cartItem = {
    name: productName,
    price: productPrice,
  };

  cartItems.push(cartItem);
  cartTotalValue += productPrice; // Update cartTotalValue
  displayCart();
}

function displayCart() {
  cart.innerHTML = '';

  if (cartItems.length === 0) {
    cart.innerHTML = '<p>Cart is empty</p>';
  } else {
    cartItems.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `${item.name} - Rp. ${item.price}`;
      cart.appendChild(itemElement);
    });
  }

  // Calculate and display the cart total
  cartTotal.textContent = `Total: Rp. ${cartTotalValue.toFixed(2)}`;
}

inputPromoCode.addEventListener('input', applyPromo);

function applyPromo() {
  const promoCode = inputPromoCode.value.toUpperCase();

  const appliedPromo = promo.find((p) => p.label === promoCode);

  if (appliedPromo) {
    const discount = appliedPromo.value;
    const discountedTotal = cartTotalValue * (1 - discount);
    const discountValue = document.getElementById('discount');

    cartTotall.textContent = `Total: Rp. ${discountedTotal.toFixed(2)}`;
    discountValue.textContent = `Discount: ${discount * 100}%`;
  } else {
    cartTotall.textContent = `Total: Rp. ${cartTotalValue.toFixed(2)}`;
  }
}
