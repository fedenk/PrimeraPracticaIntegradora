import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import Carts from '../dao/dbManagers/carts.manager.js';

const router = Router();

const productManager = new Products();
const cartManager = new Carts();

router.get('/products-view', async (req,res) => {
    try {
        const products = await productManager.getAll();
        res.render('products', { products });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/carts-view', async (req,res) => {
    try {
        const carts = await cartManager.getAll();
        res.render('carts', { carts });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/', (req,res) => {
    res.render('chat');
})

export default router;