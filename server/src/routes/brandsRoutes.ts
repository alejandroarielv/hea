import { Router } from 'express';
import { brandsController } from '../controllers/brandsController';

class BrandsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', brandsController.list);
        this.router.get('/:id', brandsController.getOne);
        this.router.post('/', brandsController.create);
        this.router.put('/:id', brandsController.update);
        this.router.delete('/:id', brandsController.delete);
    }

}

const brandsRoutes = new BrandsRoutes();
export default brandsRoutes.router;