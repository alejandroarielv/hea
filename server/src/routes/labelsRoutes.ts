import { Router } from 'express';
import { labelsController } from '../controllers/labelsController';

class LabelsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', labelsController.list);
        this.router.get('/:id', labelsController.getOne);
        this.router.post('/', labelsController.create);
        this.router.put('/:id', labelsController.update);
        this.router.delete('/:id', labelsController.delete);
    }

}

const labelsRoutes = new LabelsRoutes();
export default labelsRoutes.router;