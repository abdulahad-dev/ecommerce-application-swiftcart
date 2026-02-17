// ===============================
// Base URL
// ===============================
const BASE_URL = "https://fakestoreapi.com/products";

// ===============================
// Load All Products (Default)
// ===============================
const loadProducts = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    displayProducts(data);
};

// ===============================
// Load Categories
// ===============================
const loadCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`);
    const categories = await res.json();

    const categoryContainer = document.querySelector(
        ".container .mt-8"
    );

    categoryContainer.innerHTML = `
    <button onclick="loadProducts()" class="btn btn-active btn-primary category-btn">All</button>
  `;

    categories.forEach((cat) => {
        categoryContainer.innerHTML += `
      <button onclick="loadCategoryProducts('${cat}')" class="btn btn-outline btn-primary category-btn">
        ${cat}
      </button>
    `;
    });
};

// ===============================
// Load Products by Category
// ===============================
const loadCategoryProducts = async (category) => {
    const res = await fetch(`${BASE_URL}/category/${category}`);
    const data = await res.json();

    removeActive();
    event.target.classList.remove("btn-outline");
    event.target.classList.add("btn-active");

    displayProducts(data);
};

// ===============================
// Remove Active Button
// ===============================
const removeActive = () => {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach((btn) => {
        btn.classList.remove("btn-active");
        btn.classList.add("btn-outline");
    });
};

// ===============================
// Display Products
// ===============================
const displayProducts = (products) => {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add(
            "rounded-xl",
            "shadow-lg",
            "overflow-hidden",
            "bg-white"
        );

        card.innerHTML = `
      <div class="bg-gray-100">
        <img src="${product.image}" 
             class="w-full h-64 object-contain p-6">
      </div>

      <div class="p-5">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            ${product.category}
          </span>

          <span class="flex items-center text-yellow-500 text-sm font-medium">
            <i class="fa-solid fa-star mr-1"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <h4 class="text-md font-semibold mb-2 line-clamp-2">
          ${product.title}
        </h4>

        <p class="text-xl font-bold mb-4">$${product.price}</p>

        <div class="flex gap-3">
          <button onclick="loadProductDetails(${product.id})"
            class="flex-1 border border-gray-300 rounded-lg py-2 text-sm">
            <i class="fa-regular fa-eye mr-2"></i> Details
          </button>

          <button
            class="flex-1 bg-purple-600 text-white rounded-lg py-2 text-sm">
            <i class="fa-solid fa-cart-shopping mr-2"></i> Add
          </button>
        </div>
      </div>
    `;

        grid.appendChild(card);
    });
};

// ===============================
// Load Single Product Details
// ===============================
const loadProductDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    const product = await res.json();

    alert(`
Title: ${product.title}

Price: $${product.price}

Category: ${product.category}

Description:
${product.description}
  `);
};

// ===============================
// Initial Load
// ===============================
loadProducts();
loadCategories();
