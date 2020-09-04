"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productAttributesController_1 = require("../controllers/productAttributesController");
class ProductAttributesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productAttributesController_1.productAttributesController.list);
        this.router.get('/:id', productAttributesController_1.productAttributesController.getOne);
        this.router.post('/', productAttributesController_1.productAttributesController.create);
        this.router.put('/:id', productAttributesController_1.productAttributesController.update);
        this.router.delete('/:id', productAttributesController_1.productAttributesController.delete);
    }
}
const productAttributesRoutes = new ProductAttributesRoutes();
exports.default = productAttributesRoutes.router;
