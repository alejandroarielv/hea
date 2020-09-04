import { Router } from 'express';
import { productAttributesController } from '../controllers/productAttributesController';

class ProductAttributesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productAttributesController.list);
        this.router.get('/:id', productAttributesController.getOne);
        this.router.post('/', productAttributesController.create);
        this.router.put('/:id', productAttributesController.update);
        this.router.delete('/:id', productAttributesController.delete);
    }

}

const productAttributesRoutes = new ProductAttributesRoutes();
export default productAttributesRoutes.router;