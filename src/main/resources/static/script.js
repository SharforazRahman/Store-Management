const apiUrl = 'http://localhost:8080/products';

// Show/Hide Modals
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showAddProductModal() {
    showModal('addProductModal');
}

function showFindProductModal() {
    showModal('findProductModal');
}

function showSearchByPriceModal() {
    showModal('searchByPriceModal');
}

// Fetch and display all products
async function showAllProducts() {
    try {
        const response = await fetch(apiUrl + '/show');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add a new product
async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        imageFileName: document.getElementById('productImage').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Product added successfully!');
            closeModal('addProductModal');
            showAllProducts();
        } else {
            alert('Failed to add product.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete a product by ID
async function deleteProduct(id) {
    try {
        const response = await fetch(apiUrl + '/' + id, { method: 'DELETE' });
        if (response.ok) {
            alert('Product deleted successfully!');
            showAllProducts();
        } else {
            alert('Failed to delete product.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Find products by brand
async function findProductByBrand() {
    const brand = document.getElementById('findBrand').value;
    try {
        const response = await fetch(apiUrl + '/brand/' + brand);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Search products by price range
async function searchByPriceRange() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    try {
        const response = await fetch(apiUrl + `/price-range?min=${minPrice}&max=${maxPrice}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Sort products by price (low to high)
async function sortProductsByPrice() {
    try {
        const response = await fetch(apiUrl + '/sortByPrice');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display products dynamically
function displayProducts(products) {
    const productsContainer = document.getElementById('productList');
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="images/${product.imageFileName}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p>${product.description}</p>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productsContainer.appendChild(productCard);
    });
}
