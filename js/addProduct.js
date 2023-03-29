import { loungeChairs } from "./db.js";

export const addProduct = (id) => {
    const wishesList = document.querySelector(".wishesList");

    const btnActive = document.getElementById(id);
    btnActive.classList.add("active")
    btnActive.innerHTML = "Added"

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

    const minusCounter = document.createElement("button");
    minusCounter.classList.add("minusCounter");
    minusCounter.innerHTML = "-";

    const counter = document.createElement("input");
    counter.classList.add("counter");
    counter.value = 1;
    counter.maxLength = 1;

    const plusCounter = document.createElement("button");
    plusCounter.classList.add("plusCounter");
    plusCounter.innerHTML = "+";

    const priceForItem = document.createElement("p");
    priceForItem.classList.add("priceForItem")
    priceForItem.innerHTML = `${loungeChairs[id].price} $`;

    itemContainer.append(itemImg);
    itemContainer.append(infoContainer);

    addRemove.append(minusCounter);
    addRemove.append(counter);
    addRemove.append(plusCounter);

    amountPrice.append(addRemove);
    amountPrice.append(priceForItem)

    infoContainer.append(itemName);
    infoContainer.append(amountPrice);

    minusCounter.addEventListener("click", () => {
        if (counter.value > 1) {
            counter.value--
        }
        priceForItem.innerHTML = `${loungeChairs[id].price * counter.value} $`
    })

    plusCounter.addEventListener("click", () => {
        if (counter.value < 9) {
            counter.value++
            priceForItem.innerHTML = `${loungeChairs[id].price * counter.value} $`
        } 
    })

    counter.addEventListener("change", () => {
        if (counter.value == 0 || counter.value == null) {
            counter.value = 1
        }
        priceForItem.innerHTML = `${loungeChairs[id].price * counter.value} $`
    })

    wishesList.append(itemContainer)
}