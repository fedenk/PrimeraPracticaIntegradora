import { cartsModel } from '../dbManagers/models/carts.model.js';

export default class Carts {
    constructor() {
        console.log('Working Carts with DB');
    }

    getAll = async () => {
        const carts = await cartsModel.find().lean();
        return carts;
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    getById = async (id) => {
        const result = await cartsModel.findOne({ _id: id});
        return result;
    }

    update = async (cid, cart) => {
        const result = await cartsModel.updateOne({ _id: cid}, cart);
        return result;
    }
}