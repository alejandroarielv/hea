import { Router } from 'express';
import { shippingTypesController } from '../controllers/shippingTypesController';

class ShippingTypesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', shippingTypesController.list);
        this.router.get('/:id', shippingTypesController.getOne);
        this.router.post('/', shippingTypesController.create);
        this.router.put('/:id', shippingTypesController.update);
        this.router.delete('/:id', shippingTypesController.delete);
    }

}

const shippingTypesRoutes = new ShippingTypesRoutes();
export default shippingTypesRoutes.router;