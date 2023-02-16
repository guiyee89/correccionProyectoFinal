
let productos = [];

fetch("../js/productos2.json")
    .then(response => response.json())
    .then(data => {
        productos = data.travel;
        console.log(productos);
        addProducts(productos);
    });

const containerSection = document.querySelector("#container-section");
const numberCart = document.querySelector("#numerito");

function addProducts(productSelect) {
    productSelect.forEach(producto => {
        const article = document.createElement("article");
        article.classList.add("grid_travel_col_1", "flex_item_travel");
        article.innerHTML = `
        <div class="travel_img">
            <img class="zoom_1" src="${producto.img[0]}" alt="Sydney Opera House">
            <img class="zoom_2" src="${producto.img[1]}" alt="Travelers enjoying Sydney's views">
        </div>
        <div class="travel_text_buybutton">
            <h2>${producto.title}</h2>
            <p>${producto.description1}</p>
            <p class="p">${producto.description2}</p>
            <div class="button_travel">
                <button id="${producto.id}" class="boton">
                    <span class="button_top"> Purchase Travel Pack </span>
                </button>
            </div>
        </div>`;
        containerSection.append(article);
    });
    addingButton();
}

function addingButton() {
    let buttonSelect = document.querySelectorAll(".boton");
    buttonSelect.forEach(boton => {
        if (!boton.dataset.added) {
            boton.dataset.added = true;
            boton.addEventListener("click", addCart);
        }
    });
}

let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || { items: [], count: 0 };
console.log('shoppingCart:', shoppingCart);

function addCart(e) {
    const id = e.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === id);
    console.log(addedProduct);

    // Check if the product already exists in the cart
    const existingProduct = shoppingCart.items.find(item => item.id === addedProduct.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        // Add the selected product to the shopping cart
        shoppingCart.items.push({ ...addedProduct, quantity: 1 });
    }

    // Update the cart count
    shoppingCart.count += 1;
    numberCart.innerText = shoppingCart.count;

    // Save the shopping cart data to localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    // Update the shoppingCart variable with the new data from localStorage
    const updatedShoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || { items: [], count: 0 };
    shoppingCart.items = updatedShoppingCart.items;
    shoppingCart.count = updatedShoppingCart.count;
}
localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
window.addEventListener("pageshow", () => {
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || { items: [], count: 0 };
    numberCart.innerText = shoppingCart.count;
  });

/* window.addEventListener('load', () => {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || { items: [], count: 0 };
    numberCart.innerText = shoppingCart.count;
  }); */

