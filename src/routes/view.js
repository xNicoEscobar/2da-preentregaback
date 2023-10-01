import { Router } from "express";
import ProductManager from "../dao/database/productManager.js";
import CartManager from "../dao/database/cartManager.js";


const router = Router();
const productManager = new ProductManager();

const cartManager = new CartManager();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/realtimeproducts', (req, res)=> {
    res.render('realtimeproducts')
})

router.get('/chat', (req, res)=> {
    res.render('chat', {})
});

router.get('/products', async (req,res)=> {
    const products = await productManager.getProducts();
    res.render('products', {products})
})

router.get('/cart', async (req,res)=> {
    const cart = await cartManager.getAllCarts();
    res.render('cart', {cart})
})

export default router;