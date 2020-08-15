"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const measurementUnitsController_1 = require("../controllers/measurementUnitsController");
class MeasurementUnitsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', measurementUnitsController_1.measurementUnitsController.list);
        this.router.get('/:id', measurementUnitsController_1.measurementUnitsController.getOne);
        this.router.post('/', measurementUnitsController_1.measurementUnitsController.create);
        this.router.put('/:id', measurementUnitsController_1.measurementUnitsController.update);
        this.router.delete('/:id', measurementUnitsController_1.measurementUnitsController.delete);
    }
}
const measurementUnitsRoutes = new MeasurementUnitsRoutes();
exports.default = measurementUnitsRoutes.router;
