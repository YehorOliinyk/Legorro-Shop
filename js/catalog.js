import  {addProduct}  from './addProduct.js';
import {loungeChairs} from './db.js';
import {showProductList} from './showProductList.js';

const arrows = document.querySelector(".menuBtns");
const hamburger = document.querySelector(".menu");
const plus = document.querySelector(".expand");
const priceSlider = document.querySelector(".priceSlider");
const sizePlus = document.querySelector(".sizePlus")
const sizeFilters = document.querySelector(".sizeFilters");
const brandPlus = document.querySelector(".brandPlus");
const brandFilters = document.querySelector(".brandFilters");
const resetBtn = document.querySelector(".reset");
const shoppingCartBtn = document.querySelector(".shoppingCart");
const shoppingBag = document.querySelector(".shoppingBag");
const filtersBtn = document.querySelector(".filtersBtn");
const filtres = document.querySelector(".filtres");
const wrapper = document.querySelector(".wrapper");
const modalBackground = document.querySelector(".modalBackground");
const body = document.getElementsByTagName("body");
const productList = document.querySelector(".productList");
const wishesList = document.querySelector(".wishesList");
const mobileCart = document.getElementById("mobileCart");

// shoping cart status

export const changeBagStatus = () => {
    if (wishesList.children.length) {
        shoppingCartBtn.src = "./img/shoppingCartFilled.svg";
    } else {
        shoppingCartBtn.src = "./img/shoppingCart.svg";
    }
}

wishesList.addEventListener("DOMNodeInserted", changeBagStatus)

//hide and show block

function showHide (block) {
    if (block.style.maxHeight) {
        block.style.maxHeight = null
    } else {
        block.style.maxHeight = block.scrollHeight + 'px'
    }
}

//open shopping cart

shoppingCartBtn.addEventListener("click", () => {
    showHide(shoppingBag)
})

// show product list 

showProductList(loungeChairs) 

// burger menu

arrows.addEventListener("click", () => {  
    arrows.classList.toggle("active");
    showHide(hamburger)
    shoppingBag.style.maxHeight = null;
})

// open mobile shopping cart

mobileCart.addEventListener("click", e => {
    e.preventDefault()
    showHide(shoppingBag);
})

// filters

const sizeItemFilter = document.querySelectorAll(".size");

const parseValues = (field) => {
    const initialArray = Array.from(filtres.querySelectorAll(`input[name="${field}"]:checked`));
    return initialArray.map(item => item = item.nextElementSibling.innerHTML);
}

function getFilters() {
    const applyedFilters = {
        size: parseValues("size"),
        brand: parseValues("brand"),
        price: [+outputMin.innerHTML, +outputMax.innerHTML]
    }

    let filtredData = loungeChairs
    filtredData = filtredData.filter(item => +item.price >= applyedFilters.price[0] & +item.price <= applyedFilters.price[1])
    if (applyedFilters.size.length) filtredData = filtredData.filter(item => applyedFilters.size.includes(item.size));
    if (applyedFilters.brand.length) filtredData = filtredData.filter(item => applyedFilters.brand.includes(item.brand));
    if (!filtredData.length) {
        productList.innerHTML = "There are no products in choosed categories, reset filters and try again"
        return
    }

    showProductList(filtredData)
}


sizeItemFilter.forEach(item => {
    item.addEventListener("click", getFilters)
})

sizePlus.addEventListener("click", () => {
    sizePlus.classList.toggle("active");
    showHide(sizeFilters)
})

//slider range

const minSlider = document.getElementById("min");
const maxSlider = document.getElementById("max");
const outputMin = document.getElementById("minValue");
const outputMax = document.getElementById("maxValue");
const minMaxRange = document.querySelector(".minMaxRange");

outputMin.innerHTML = minSlider.value;
outputMax.innerHTML = maxSlider.value;

minSlider.oninput = function () {
    outputMin.innerHTML = this.value;
}

maxSlider.oninput = function () {
    outputMax.innerHTML = this.value;
}

plus.addEventListener("click", () => {
    plus.classList.toggle("active");
    showHide(priceSlider)
})

minMaxRange.addEventListener("change", getFilters)


//brand filter

const brandItemFilter = document.querySelectorAll(".brand")

brandItemFilter.forEach(item => {
    item.addEventListener("click", getFilters)
})

brandPlus.addEventListener("click", () => {
    brandPlus.classList.toggle("active");
    showHide(brandFilters)
    
})

// reset all filters 

resetBtn.addEventListener("click", () => {
    sizeItemFilter.forEach(item => {
        item.checked = false
    })

    outputMin.innerHTML = 200
    outputMax.innerHTML = 1200

    brandItemFilter.forEach(item => {
        item.checked = false
    })

    showProductList(loungeChairs)
})

// show filteres on smaller screen resolution


filtersBtn.addEventListener("click", (e) => {
    e.preventDefault()
    modalBackground.style.display = "flex"
    filtres.classList.add("active")
    body[0].style.overflow = "hidden"
})

wrapper.addEventListener("click", e => {
    
    if (!filtres.contains(e.target) & !filtersBtn.contains(e.target)) {
        body[0].style.overflow = "visible"
        modalBackground.style.display = "none"
        filtres.classList.remove("active")
    }
})

// get items from local storage

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

for (let id of cartItems) {
    addProduct(id)
}





