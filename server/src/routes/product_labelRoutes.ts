import { Router } from 'express';
import { product_labelsController } from '../controllers/product_labelController';

class Product_labelsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', product_labelsController.list);
        this.router.get('/:id', product_labelsController.getOne);
        this.router.post('/', product_labelsController.create);
        this.router.put('/:id', product_labelsController.update);
        this.router.delete('/:id', product_labelsController.delete);
    }

}

const product_labelsRoutes = new Product_labelsRoutes();
export default product_labelsRoutes.router;