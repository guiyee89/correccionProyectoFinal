const menuOpen = document.querySelector("#mobile-menu-open");
const menuClose = document.querySelector("#mobile-menu-close");
const menuAside = document.querySelector("aside");

menuOpen.addEventListener("click", () => {
    menuAside.classList.add("menu-visible");
})

menuClose.addEventListener("click", () => {
    menuAside.classList.remove("menu-visible");
})

buttonSelect.forEach(boton => boton.addEventListener("click",() => {
    menuAside.classList.remove("menu-visible")
}))