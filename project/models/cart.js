class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity,
        this.totalPrice = totalPrice
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            price: product.price
        }

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].product.id == product.id) {
                cartItem.quantity = this.items[i].quantity + 1;
                cartItem.price = this.items[i].price + product.price;
                this.items[i] = cartItem;

                this.totalQuantity++;
                this.totalPrice += product.price;
                return;
            }
        }

        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += product.price;
    }

    updateItem(productId, newQuantity) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            
            if (this.items[i].product.id == productId && newQuantity > 0) {
                
                const cartItem = {...item};
                const quantityChange = +newQuantity - item.quantity;
                
                cartItem.quantity = +newQuantity;
                cartItem.price = newQuantity * item.product.price;
                this.items[i] = cartItem;
                this.totalQuantity += quantityChange;
                this.totalPrice += quantityChange * +item.product.price.toFixed(2);
                
                return { updatedItemPrice: cartItem.price };
            } else if(this.items[i].product.id == productId && newQuantity <= 0) {
                this.items.splice(i, 1);
                this.totalQuantity -= item.quantity;
                
                this.totalPrice -= +item.price.toFixed(2);
                return { updatedItemPrice: 0 };
            }
        }
    }

    
}

module.exports = Cart;