import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.log('Cart loading error', error);
            this.carts = [];
        }
    }

    async getAllCarts() {
        return this.carts;
    }

    async addCart(cart) {
        const newCart = { ...cart };

        if (this.carts.length === 0) {
            newCart.id = 1;
        } else {
            newCart.id = this.carts[this.carts.length - 1].id + 1;
        }

        this.carts.push(newCart);
        await this.saveCart();
        return newCart.id;
    }

    async saveCart() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, data, 'utf-8');
        } catch (error) {
            console.log('Error saving cart', error);
        }
    }

    getCartById(id) {
        return this.carts.find((cart) => cart.id === id);
    }

    async addProductToCart(cid, pid, quantity) {
        const cartIndex = this.carts.findIndex((cart) => cart.id === cid);

        if (cartIndex !== -1) {
            const cartToUpdate = this.carts[cartIndex];
            const existingProduct = cartToUpdate.products.find((product) => product.pid === pid);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cartToUpdate.products.push({ pid, quantity });
            }

            await this.saveCart();
        } else {
            console.log('Cart not found');
        }
    }

    getProductInCart(cid) {
        const cart = this.getCartById(cid);

        if (cart) {
            return cart.products;
        } else {
            console.log('Cart not found');
            return [];
        }
    }
}