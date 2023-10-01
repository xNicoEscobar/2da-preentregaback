import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getAllCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }

    async addCart(cart) {
        const newCart = await cartModel.create(cart);
        return newCart.id;
    }

    async getCartById(cid) {
        const cart = await cartModel.find({ _id: cid });
        return cart;
    }

    async getProductInCart(cid) {
        const cart = await this.getCartById(cid);

        if (cart) {
            return cart.products;
        } else {
            console.log('Cart not found');
            return [];
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartFind = await cartModel.findOne({ _id: cid });

            if (cartFind !== null) {
                const existingProduct = cartFind.products.findIndex((product) => product._id.toString() === pid);

                if (existingProduct !== -1) {
                    cartFind.products[existingProduct].quantity += quantity;
                } else {
                    cartFind.products.push({ pid, quantity });
                }

                await cartModel.updateOne({ _id: cid }, { products: cartFind.products });

                console.log('Product added to cart')
            } else {
                console.log('The cart was not found')
            }
        } catch (error) {
            console.log('Error updating cart', error);
        }
    }

    //Eliminar producto seleccionado del carrito
    async deleteProductOfCart(cid, pid) {
        try {
            const result = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            );
            if (result) {
                console.log('Product removed from the cart');
            } else {
                console.log('Product not found in the cart');
            }
        } catch (error) {
            console.log('Error when removing product from cart', error);
        }
    }

    //Actualizar array de productos
    async updateCart(cid, updateData) {
        try {
            const data = await cartModel.updateOne({ _id: cid }, updateData)
            return data;

        } catch (error) {
            console.log('Error updating cart', error);
        }
    }

    //Actualizar cantidad de productos del carrito
    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                console.log("Cart not found");
            }

            const productToUpdate = cart.products.find(
                (product) => product._id.toString() === pid
            );

            if (!productToUpdate) {
                console.log("Product not found in cart");
            }

            productToUpdate.quantity = quantity;
            await cart.save();

            return cart;
        } catch (error) {
            console.log('Error updating product of cart', error);
        }
    }

    //Vaciar carrito
    async emptyCart(cid) {
        try {
            const cartFind = await cartModel.findOne({ _id: cid });

            if (!cartFind) {
                console.log("Cart not found")
            }

            cartFind.products = [];
            await cartFind.save();
        } catch (error) {
            console.log('Error when emptying cart ', error);
        }

    }
}