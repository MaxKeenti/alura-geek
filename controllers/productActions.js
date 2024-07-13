// Simulate a database with an array
let productDatabase = [];

// Function to add a product
export const addProduct = async (product) => {
    // Assign an ID to the product
    const productId = Date.now().toString();
    const newProduct = { id: productId, ...product };
    productDatabase.push(newProduct);
    return newProduct;
};

// Function to fetch all products
export const fetchProducts = async () => {
    return productDatabase;
};

// Function to delete a product
export const deleteProduct = async (productId) => {
    productDatabase = productDatabase.filter(product => product.id !== productId);
};

