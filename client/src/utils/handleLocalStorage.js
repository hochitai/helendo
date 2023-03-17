export const handleAddToCart = (id, name, quantity, price, image, saleID, slug) => {
    let cart = [];
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    const isExisted = cart.find((ele) => ele.id === id);
    if (isExisted) {
        cart = cart.map((ele) => {
            if (ele.id === id) return { ...ele, quantity: ele.quantity + quantity };
            return ele;
        });
    } else {
        cart.push({
            id,
            name,
            quantity,
            price,
            image,
            saleID,
            slug,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
};

export const handleRemoveItemCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter((ele) => ele.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
};
