console.log("E-Commerce Website Loaded");

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const productGrid = document.getElementById('products');

  fetch('https://fakestoreapi.com/products?limit=8')
    .then(res => res.json())
    .then(products => {
      productGrid.innerHTML = ''; // Clear any existing content

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3>${product.title}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        `;

        productGrid.appendChild(card);
      });
    })
    .catch(err => {
      productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
      console.error(err);
    });
});
