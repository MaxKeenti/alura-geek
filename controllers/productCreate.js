import { addProduct, fetchProducts, deleteProduct } from "../controllers/productActions.js";

const productForm = document.querySelector("[data-form]");
const productList = document.querySelector("[data-product-cards]");

const loadProducts = async () => {
    const products = await fetchProducts();
    productList.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" class="product-img">
      <div class="card-container--info">
        <h3>${product.name}</h3>
        <p class="card-container--value">$${product.price.toFixed(2)}</p>
      </div>
      <button class="delete-button" data-product-id="${product.id}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
        productList.appendChild(productCard);
    });

    const deleteButtons = productList.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const productId = button.getAttribute("data-product-id");
            await deleteProduct(productId);
            loadProducts();
        });
    });
};

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productName = productForm.querySelector("[data-product-name]").value;
    const productPrice = parseFloat(productForm.querySelector("[data-product-price]").value);
    const productImageUrl = productForm.querySelector("[data-product-image]").value;

    if (!productName || !productPrice || !productImageUrl) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }

    const newProduct = {
        name: productName,
        price: productPrice,
        imageUrl: productImageUrl,
    };

    await addProduct(newProduct);
    productForm.reset();
    loadProducts();
});

document.querySelector("[data-clear]").addEventListener("click", () => {
    productForm.reset();
});

loadProducts();
