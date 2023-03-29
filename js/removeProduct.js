import { changeBagStatus } from "./catalog.js";

const itemContainers = document.getElementsByClassName("itemContainer");

export const removeProduct = (id, btn) => {

    btn.classList.remove("active");
    btn.innerHTML = "Add to Cart";

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newCartItems = cartItems.filter(item => item !== id);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

    for (let item of itemContainers) {
        if (item.id === id) {
            item.remove()
            changeBagStatus()
        }
    }
}