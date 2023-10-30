import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';

const router = Router();

const productManager = new Products();

router.get('/', async (req,res) => {
    try {
        const products = await productManager.getAll();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
})

router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, status, stock, category, image } = req.body;

        if( !title || !description || !code || !price || !status || !stock || ! category || !image ) {
            return res.status(400).send({ status: 'error', message: 'imcomplete values'});
        }

        const result = await productManager.save({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            image
        });

        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

router.put('/:id', async (req,res) => {
    try {
        const { title, description, code, price, status, stock, category, image } = req.body;
        const { id } = req.params;

        const productById = productManager.getById(id);

        if(!productById){
            return res.status(400).send({ status: 'error', message: 'id not found'});
        }

        if( !title || !description || !code || !price || !status || !stock || ! category || !image ) {
            return res.status(400).send({ status: 'error', message: 'imcomplete values'});
        }

        const result = await productManager.update(id, {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            image
        });

        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});

export default router;