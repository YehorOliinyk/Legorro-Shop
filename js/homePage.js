import { addProductHomePage } from "./addProductHomePage.js";

const slides = document.querySelectorAll(".slide");
const activeButton = document.querySelector(".btn")
const btns = document.querySelector(".buttons");
const arrows = document.querySelector(".menuBtns");
const hamburger = document.querySelector(".menu");
const shoppingCartBtn = document.querySelector(".shoppingCart");
const shoppingBag = document.querySelector(".shoppingBag");
const mobileShoppingCart = document.getElementById("mobileShoppintCart");
const wishesList = document.querySelector(".wishesList")

//slider

function hideOthersSlide (activeBtn) {
    slides.forEach(slide => {
        if (slide.id === activeBtn.id) {
            slide.style.display = "flex"
        } else {
            slide.style.display = "none"
        }
    });
}

hideOthersSlide(activeButton)

function swipeSlide (e) {
    let chooseSlide = e.target.dataset["f"];
    if (!chooseSlide) return
    hideOthersSlide(e.target)
}

btns.addEventListener("click", e => {swipeSlide(e)} )

// hide show block

const hideShowBlock = (name) => {
    if (name.style.maxHeight) {
        name.style.maxHeight = null
    } else {
        name.style.maxHeight = name.scrollHeight + 'px'
    }
}

// burger menu

arrows.addEventListener("click", () => {
    arrows.classList.toggle("active");
    hideShowBlock(hamburger)
    shoppingBag.style.maxHeight = null
})

//open shopping cart

shoppingCartBtn.addEventListener("click", () => {
    hideShowBlock(shoppingBag)
})

// open shopping cart on mobile phone

mobileShoppingCart.addEventListener("click", e => {
    e.preventDefault()
    hideShowBlock(shoppingBag)
})

// get elements from local storage

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

for (let id of cartItems) {
    addProductHomePage(id)
}


