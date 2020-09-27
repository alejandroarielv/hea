import { Router } from 'express';
import { product_featuresController } from '../controllers/product_featureController';

class Product_featuresRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', product_featuresController.list);
        this.router.get('/:id', product_featuresController.getOne);
        this.router.post('/', product_featuresController.create);
        this.router.put('/', product_featuresController.update);
        this.router.delete('/', product_featuresController.delete);
    }

}

const product_featuresRoutes = new Product_featuresRoutes();
export default product_featuresRoutes.router;