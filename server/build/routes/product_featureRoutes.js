"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_featureController_1 = require("../controllers/product_featureController");
class Product_featuresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', product_featureController_1.product_featuresController.list);
        this.router.get('/:id', product_featureController_1.product_featuresController.getOne);
        this.router.post('/', product_featureController_1.product_featuresController.create);
        this.router.put('/:id', product_featureController_1.product_featuresController.update);
        this.router.delete('/:id', product_featureController_1.product_featuresController.delete);
    }
}
const product_featuresRoutes = new Product_featuresRoutes();
exports.default = product_featuresRoutes.router;
