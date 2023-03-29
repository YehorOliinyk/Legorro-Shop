import {addProduct} from "./addProduct.js";
import { localMemory } from "./localMemory.js";
import { removeProduct } from "./removeProduct.js";

const productList = document.querySelector(".productList");

const toggleBtnActive = (btn) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.map(item => {
        if (item === btn.id) {
            btn.classList.add("active")
            btn.innerHTML = "Added"
        } 
    })
}

export const showProductList = (db) => {
    productList.innerHTML = " ";

    db.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("element");
        element.dataset.id = item.id;
        
        const elementImg = document.createElement("img");
        elementImg.classList.add("elementImg")
        elementImg.src = item.img;

        const addToCart = document.createElement("div");
        addToCart.classList.add("addToCart");
        addToCart.id = item.id;
        addToCart.innerHTML = "Add to Cart"
        toggleBtnActive(addToCart);

        //add to shoppping cart

        addToCart.addEventListener("click", (e) => {
            if (addToCart.classList == "addToCart") {
                addProduct(e.target.parentNode.dataset.id)
                localMemory(e.target.parentNode.dataset.id)
            } else {
                removeProduct(e.target.parentNode.dataset.id, addToCart)
            }
            
        })

        const elementName = document.createElement("p");
        elementName.innerHTML = item.name;
        elementName.classList.add("elementName");

        const elementPrice = document.createElement("p");
        elementPrice.innerHTML = `${item.price} $`;
        elementPrice.classList.add("elementPrice");
        
        element.append(elementImg);
        element.append(addToCart)
        element.append(elementName);
        element.append(elementPrice);

        productList.append(element)
    });
}