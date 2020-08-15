import { Router } from 'express';
import { weightUnitsController } from '../controllers/weightUnitsController';

class WeightUnitsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', weightUnitsController.list);
        this.router.get('/:id', weightUnitsController.getOne);
        this.router.post('/', weightUnitsController.create);
        this.router.put('/:id', weightUnitsController.update);
        this.router.delete('/:id', weightUnitsController.delete);
    }

}

const weightUnitsRoutes = new WeightUnitsRoutes();
export default weightUnitsRoutes.router;