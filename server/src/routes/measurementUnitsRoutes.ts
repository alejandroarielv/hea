import { Router } from 'express';
import { measurementUnitsController } from '../controllers/measurementUnitsController';

class MeasurementUnitsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', measurementUnitsController.list);
        this.router.get('/:id', measurementUnitsController.getOne);
        this.router.post('/', measurementUnitsController.create);
        this.router.put('/:id', measurementUnitsController.update);
        this.router.delete('/:id', measurementUnitsController.delete);
    }

}

const measurementUnitsRoutes = new MeasurementUnitsRoutes();
export default measurementUnitsRoutes.router;