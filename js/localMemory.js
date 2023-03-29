
export const localMemory = (id) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}