import { Router } from 'express';
import { product_shippingTypesController } from '../controllers/product_shippingTypeController';

class Product_shippingTypesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', product_shippingTypesController.list);
        this.router.get('/:id', product_shippingTypesController.getOne);
        this.router.post('/', product_shippingTypesController.create);
        this.router.put('/:id', product_shippingTypesController.update);
        this.router.delete('/:id', product_shippingTypesController.delete);
    }

}

const product_shippingTypesRoutes = new Product_shippingTypesRoutes();
export default product_shippingTypesRoutes.router;