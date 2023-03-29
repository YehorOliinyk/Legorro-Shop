import { loungeChairs } from "./db.js";

export const addProductHomePage = (id) => {

    const wishesList = document.querySelector(".wishesList");
    const shoppingCartBtn = document.querySelector(".shoppingCart")

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("itemContainer");
    itemContainer.id = id;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");

    const itemImg = document.createElement("img");
    itemImg.width = 130;
    itemImg.height = 130;
    itemImg.src = loungeChairs[id].img;

    const itemName = document.createElement("p");
    itemName.classList.add("itemName");
    itemName.innerHTML = loungeChairs[id].name;

    const amountPrice = document.createElement("div");
    amountPrice.classList.add("amountPrice");

    const addRemove = document.createElement("div");
    addRemove.classList.add("addRemove");

    const counter = document.createElement("input");
    counter.classList.add("counter");
    counter.setAttribute('readonly', true)
    counter.value = 1;

    const priceForItem = document.createElement("p");
    priceForItem.classList.add("priceForItem")
    priceForItem.innerHTML = `${loungeChairs[id].price} $`;

    itemContainer.append(itemImg);
    itemContainer.append(infoContainer);

    addRemove.append(counter);

    amountPrice.append(addRemove);
    amountPrice.append(priceForItem)

    infoContainer.append(itemName);
    infoContainer.append(amountPrice);

    wishesList.append(itemContainer)

    if (wishesList.children.length) {
        shoppingCartBtn.src = "./img/shoppingCartFilled.svg";
    } else {
        shoppingCartBtn.src = "./img/shoppingCart.svg";
    }
}