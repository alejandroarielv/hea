"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_labelController_1 = require("../controllers/product_labelController");
class Product_labelsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', product_labelController_1.product_labelsController.list);
        this.router.get('/:id', product_labelController_1.product_labelsController.getOne);
        this.router.post('/', product_labelController_1.product_labelsController.create);
        this.router.put('/:id', product_labelController_1.product_labelsController.update);
        this.router.delete('/:id', product_labelController_1.product_labelsController.delete);
    }
}
const product_labelsRoutes = new Product_labelsRoutes();
exports.default = product_labelsRoutes.router;
