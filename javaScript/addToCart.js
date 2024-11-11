const products = [
  {
    id: 1,
    name: "Gröna grodor",
    amount: "1 kg",
    price: 13,
    image: "/images/grona-grodor_picture.png",
  },
  {
    id: 2,
    name: "Gott & blandat",
    amount: "1 kg",
    price: 10,
    image: "/images/gottblandat-original_picture.png",
  },
  {
    id: 3,
    name: "Banana Bubs",
    amount: "1 kg",
    price: 14,
    image: "/images/Banana_Bubs.png",
  },
  {
    id: 4,
    name: "Hallon-Lakritsskalle",
    amount: "1 kg",
    price: 15,
    image: "/images/Hallon_Lakritsskalle.png",
  },
  {
    id: 5,
    name: "Juleskum",
    amount: "1 kg",
    price: 9,
    image: "/images/juleskum_picture.png",
  },
  {
    id: 6,
    name: "Cola flaskor",
    amount: "1 kg",
    price: 11,
    image: "/images/stora-colaflaskor_picture.png",
  },
];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
    // cart.push({
    //     id: product.id,
    //     name: product.name,
    //     amount: product.amount,
    //     price: product.price,
    //     quantity: 1
    //   });
  }

  // Sparar till localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Uppdatera indikatorn
  updateCartIndicator();
}

function updateCartIndicator() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountElement = document.querySelector(".nav-link .rounded-circle");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

document.querySelectorAll(".btn.bg-mimiPink").forEach((button) => {
  const productId = parseInt(button.getAttribute("data-id"));
  button.addEventListener("click", () => addToCart(productId));
});
updateCartIndicator();

function printCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartProducts.length > 0) {
    const cartProductsContainer = document.getElementById("cart-items");
    cartProductsContainer.innerHTML = "";

    cartProducts.forEach((item) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("mb-4");

      // Skapa HTML-strukturen för produkten
      productDiv.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" width="100" class="me-3">
                        <div>
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Quantity: ${item.quantity}</p>
                            <p class="card-text">Price: $${item.price}</p>
                        </div>
                        <div class="ms-auto">
                        <a class="nav-link">
                            <i class="bi bi-trash3" style="font-size: 24px;"></i>
                        </a>
                        </div>
                    </div>
                </div>
            `;

      cartProductsContainer.appendChild(productDiv);
    });
  } else {
    const emptyCartMessage = document.getElementById("empty-cart-message");
  }
}
document.addEventListener("DOMContentLoaded", printCartProducts);
