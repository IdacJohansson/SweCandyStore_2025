const products = [
  {
    id: 1,
    name: "Gröna grodor",
    amount: "1",
    price: 13,
    image: "/images/candy.png",
  },
  {
    id: 2,
    name: "Gott & blandat",
    amount: "1",
    price: 10,
    image: "/images/candy2.png",
  },
  {
    id: 3,
    name: "Banana Bubs",
    amount: "1",
    price: 14,
    image: "/images/candy3.png",
  },
  {
    id: 4,
    name: "Hallon-Lakritsskalle",
    amount: "1",
    price: 15,
    image: "/images/candy4.png",
  },
  {
    id: 5,
    name: "Juleskum",
    amount: "1",
    price: 9,
    image: "/images/candy5.png",
  },
  {
    id: 6,
    name: "Cola flaskor",
    amount: "1",
    price: 11,
    image: "/images/candy6.png",
  },
];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item && item.id);

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
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

function removeCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartIndicator();
  printCartProducts();
}

function printCartProducts() {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartProductsContainer = document.getElementById("cart-items");

  cartProductsContainer.innerHTML = "";

  if (cartProducts.length > 0) {
    let amountTotal = 0;
    let totalPrice = 0;

    cartProducts.forEach((item) => {
      if (item && item.id) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("mb-4");

        productDiv.innerHTML = `
          <div class="card">
  <div class="card__body d-flex align-items-center">
    <img src="${item.image}" alt="${item.name}" width="100" class="card__img me-3">
    <div class="d-flex flex-column">
      <h5 class="card__title">${item.name}</h5>
      <p class="card__text mb-1">Quantity: ${item.quantity}</p>
      <p class="card__text mb-1">Pound: ${item.amount}</p>
      <p class="card__text mb-1">Price: $${item.price}</p>
    </div>
    <div class="ms-auto">
      <div class="nav-link">
        <i class="bi bi-trash3 trash-icon m-3" style="font-size: 24px;" data-id="${item.id}"></i>
      </div>
    </div>
  </div>
</div>
        `;

        cartProductsContainer.appendChild(productDiv);

        const itemTotal = item.quantity * item.price;
        totalPrice += itemTotal;

        amountTotal += item.amount * item.quantity;
      }
    });

    const trashIcon = document.querySelectorAll(".bi.bi-trash3");
    trashIcon.forEach((icon) => {
      const productId = parseInt(icon.getAttribute("data-id"));
      icon.addEventListener("click", () => removeCartItem(productId));
    });

    const summaryDiv = document.createElement("div");
    summaryDiv.classList.add("card", "mt-4");

    summaryDiv.innerHTML = `
      <div class="card__body">
        <h5 class="card__title">Cart Summary</h5>
        <hr>
        <p><strong>Total Price: $${totalPrice}</strong></p>
        <p><strong>Total Pounds: ${amountTotal}</strong></p>
      </div>
    `;

    cartProductsContainer.appendChild(summaryDiv);
  } else {
    cartProductsContainer.innerHTML = `
      <div class="mt-4 mb-4">
        <h5>Your cart is empty!</h5>
      </div>
    `;
  }
}

function addToFavorites(productId) {
  const product = products.find((p) => p.id === productId);
  let fav = JSON.parse(localStorage.getItem("favorite")) || [];

  fav = fav.filter((item) => item && item.id);

  const existingFavProduct = fav.find((item) => item.id === productId);

  if (existingFavProduct) {
    existingFavProduct.quantity += 1;
  } else {
    fav.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("favorite", JSON.stringify(fav));
}

document.querySelectorAll(".btn.bg-lavenderPink").forEach((button) => {
  const productId = parseInt(button.getAttribute("data-id"));
  button.addEventListener("click", () => addToFavorites(productId));
});

function removeFavItem(productId) {
  let fav = JSON.parse(localStorage.getItem("favorite")) || [];

  fav = fav.filter((item) => item.id !== productId);
  localStorage.setItem("favorite", JSON.stringify(fav));

  printFavoriteProducts();
}

function printFavoriteProducts() {
  const favProducts = JSON.parse(localStorage.getItem("favorite")) || [];
  const favProductsContainer = document.getElementById("favorite-items");

  favProductsContainer.innerHTML = "";

  if (favProducts.length > 0) {
    favProducts.forEach((item) => {
      if (item && item.id) {
        const favProductDiv = document.createElement("div");
        favProductDiv.classList.add("mb-4");

        favProductDiv.innerHTML = `
          <div class="card">
  <div class="card-body d-flex align-items-center">
    <img src="${item.image}" alt="${item.name}" width="100" class="card__img me-3">
    <div class="d-flex flex-column">
      <h5 class="card__title">${item.name}</h5>
      <p class="card__text mb-1">Pound: ${item.amount}</p>
      <p class="card__text mb-1">Price: $${item.price}</p>
    </div>
      <div class="ms-auto d-flex">
      <div class="nav-link position-relative">
        <style= class="bi bi-heartbreak trash-icon m-3" style="font-size: 24px;" data-id="${item.id}"></bi>
      </div>
      <div class="nav-link">
        <style= class="bi bi-bag-plus trash-icon m-3" style="font-size: 24px;" data-id="${item.id}"></bi>
      </div>
    </div>
  </div>
</div>
        `;
        favProductsContainer.appendChild(favProductDiv);
      }
      const heartBreakIcon = document.querySelectorAll(".bi.bi-heartbreak");
      heartBreakIcon.forEach((icon) => {
        const productId = parseInt(icon.getAttribute("data-id"));
        icon.addEventListener("click", () => removeFavItem(productId));
      });

      document.querySelectorAll(".bi.bi-bag-plus").forEach((button) => {
        const productId = parseInt(button.getAttribute("data-id"));
        button.addEventListener("click", () => addToCart(productId));
      });
    });
  } else {
    favProductsContainer.innerHTML = `
      <div class="mt-4 mb-4">
        <h5>No favorites here!</h5>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("cart-page")) {
    printCartProducts();
  } else if (document.body.classList.contains("favorite-page")) {
    printFavoriteProducts();
  }
  updateCartIndicator();
});
