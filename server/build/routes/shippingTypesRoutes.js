"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shippingTypesController_1 = require("../controllers/shippingTypesController");
class ShippingTypesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', shippingTypesController_1.shippingTypesController.list);
        this.router.get('/:id', shippingTypesController_1.shippingTypesController.getOne);
        this.router.post('/', shippingTypesController_1.shippingTypesController.create);
        this.router.put('/:id', shippingTypesController_1.shippingTypesController.update);
        this.router.delete('/:id', shippingTypesController_1.shippingTypesController.delete);
    }
}
const shippingTypesRoutes = new ShippingTypesRoutes();
exports.default = shippingTypesRoutes.router;
