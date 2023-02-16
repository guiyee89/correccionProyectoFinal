
let travelData = localStorage.getItem("shoppingCart");
travelData = JSON.parse(localStorage.getItem("shoppingCart"));
console.log(travelData);

let productos = [];
let servicios = [];
fetch("../js/productos2.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data.travel
        servicios = data.services

        addProducts(productos, servicios);
    });

const containerProducts = document.querySelector("#container-productos");
const buttonSelect = document.querySelectorAll(".boton-categoria");
const title = document.querySelector(".titulo-principal");
const cartNumber = document.querySelector("#numerito");

let cart 
let cartLS = travelData
cartLS = localStorage.getItem("productos-en-cart");

if (cartLS) {
    cart = JSON.parse(cartLS);
    addQuantity()
} else {
    cart = [];
}

function addProducts(productSelect, serviceSelect) {
    containerProducts.innerHTML = "";

    productSelect.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
      <img class="producto-imagen" src="${producto.img[0]}" alt="${producto.title}">
      <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.title}</h3>
        <p class="producto-precio">$${producto.price}</p>
        <button class="producto-agregar" id="${producto.id}"><span class="button_top">Add to Cart</span></button>
      </div>
    `;
        containerProducts.append(div);
    });
    serviceSelect.forEach((servicio) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img class="producto-imagen" src="${servicio.img[0]}" alt="${servicio.title}">
          <div class="producto-detalles">
            <h3 class="producto-titulo">${servicio.title}</h3>
            <p class="producto-precio">$${servicio.price}</p>
            <button class="producto-agregar" id="${servicio.id}"><span class="button_top">Add to Cart</span></button>
          </div>
        `;
        containerProducts.append(div);
      });

    addingButtons();
}


buttonSelect.forEach(boton => {
    boton.addEventListener("click", (e) => {
      buttonSelect.forEach(boton => boton.classList.remove("active"))

      e.currentTarget.classList.add("active")

      if (e.currentTarget.id !== "all") {      /* "all" es la clase en HTML */
        const productTravel = productos.find(producto =>  producto.cat.id === e.currentTarget.id);
        const productService = servicios.find(servicio =>  servicio.cat.id === e.currentTarget.id);

        if (productTravel) {
          title.innerText = productTravel.cat.id;
          const buttonProduct = productos.filter(producto => producto.cat.id === e.currentTarget.id);
          addProducts(buttonProduct, []);
        } else if (productService) {
          title.innerText = productService.cat.id;
          const buttonService = servicios.filter(servicio => servicio.cat.id === e.currentTarget.id);
          addProducts(buttonService, []);
        }
      } else {
        title.innerText = "All our products"
        addProducts(productos, servicios);
      }
    })
  });

function addingButtons(){  
    addButton = document.querySelectorAll(".producto-agregar");

    addButton.forEach(boton => {
        boton.addEventListener("click", addCart)
    })

}
if(cartLS){
    cart = JSON.parse(cartLS);
    addQuantity()
} else {
    cart = [];
}

function addCart(e){
    const id = e.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === id)
    const addedService = servicios.find(servicio => servicio.id === id)

    if(cart.some(producto => producto.id === id)) {  
        const index = cart.findIndex(producto => producto.id === id); 
        cart[index].quantity++;                                            
    } else {
        if (addedProduct) {
            addedProduct.quantity = 1;
            cart.push(addedProduct);
        } else if (addedService) {
            addedService.quantity = 1;
            cart.push(addedService);
        }
    }

    addQuantity()
    localStorage.setItem("productos-en-cart", JSON.stringify(cart))

    Toastify({
        text: "Added to Cart",
        offset: {
            x: 50, 
            y: 80, 
          },
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to left, #000, #2e2c2c)",
          borderRadius: "1rem",
        },
        onClick: function(){} 
      }).showToast();
}


function addQuantity(){
    
    let num = cart.reduce((acc, prod) => acc + prod.quantity, 0);
    cartNumber.innerText = num;
}

