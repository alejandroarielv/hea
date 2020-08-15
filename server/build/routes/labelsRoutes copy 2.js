"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labelsController_1 = require("../controllers/labelsController");
class LabelsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', labelsController_1.labelsController.list);
        this.router.get('/:id', labelsController_1.labelsController.getOne);
        this.router.post('/', labelsController_1.labelsController.create);
        this.router.put('/:id', labelsController_1.labelsController.update);
        this.router.delete('/:id', labelsController_1.labelsController.delete);
    }
}
const labelsRoutes = new LabelsRoutes();
exports.default = labelsRoutes.router;
