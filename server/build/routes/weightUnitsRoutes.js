"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weightUnitsController_1 = require("../controllers/weightUnitsController");
class WeightUnitsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', weightUnitsController_1.weightUnitsController.list);
        this.router.get('/:id', weightUnitsController_1.weightUnitsController.getOne);
        this.router.post('/', weightUnitsController_1.weightUnitsController.create);
        this.router.put('/:id', weightUnitsController_1.weightUnitsController.update);
        this.router.delete('/:id', weightUnitsController_1.weightUnitsController.delete);
    }
}
const weightUnitsRoutes = new WeightUnitsRoutes();
exports.default = weightUnitsRoutes.router;
