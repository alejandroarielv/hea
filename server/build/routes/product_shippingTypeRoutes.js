"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_shippingTypeController_1 = require("../controllers/product_shippingTypeController");
class Product_shippingTypesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', product_shippingTypeController_1.product_shippingTypesController.list);
        this.router.get('/:id', product_shippingTypeController_1.product_shippingTypesController.getOne);
        this.router.post('/', product_shippingTypeController_1.product_shippingTypesController.create);
        this.router.put('/:id', product_shippingTypeController_1.product_shippingTypesController.update);
        this.router.delete('/:id', product_shippingTypeController_1.product_shippingTypesController.delete);
    }
}
const product_shippingTypesRoutes = new Product_shippingTypesRoutes();
exports.default = product_shippingTypesRoutes.router;
