const products = [
    {
      id: 1,
      Name: "radio",
      Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDYGMOMmuGid8HGCP5tqaf4PL8zLNNH9NIA&s",
      price: "$25"
    }
     
  ]
  
  function renderProducts(_products, productList) {
    const container = document.getElementById(productList);
    container.innerHTML = "";  // Clear container first
    _products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `
        <img src="${product.Image}" alt="${product.Name}" />
        <h3>${product.Name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      container.appendChild(productDiv);
    });
  }
  
  if (document.getElementById("productList")) {
    renderProducts(products, "productList");
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.Name} has been added to the cart`);
    renderCart();
  }
  
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartItems");
    container.innerHTML = "";  // Clear the cart container first
    if (cart.length === 0) {
      container.innerHTML = "<h1>Your cart is empty</h1>";
    } else {
      cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
          <img src="${item.Image}" alt="${item.Name}" />
          <h3>${item.Name}</h3>
          <h2>${item.price}</h2>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(cartDiv);
      });
    }
  }
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);  // Remove the item from cart
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();  // Re-render the cart after removal
  }
  
  function searchProducts(query) {
    const filterProducts = products.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filterProducts, "productList");
  }
  
  document.getElementById("searchButton")?.addEventListener("click", () => {
    const query = document.getElementById("productSearch").value;  // Corrected from ariaValueMax to value
    searchProducts(query);
  });
  
  if (document.getElementById("cartItems")) {
    renderCart();  // Render cart items if the cart exists
  }
  function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.lenght>0){
        subtotalContainer.innerHTML = `subtotal : Rs. $(subtotal)`
  }else{
    subtotalContainer.innerHTML = `no items in the cart`
  }


}

  
