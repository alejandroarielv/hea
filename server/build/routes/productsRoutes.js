"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productsController_1.productsController.list);
        this.router.get('/:id', productsController_1.productsController.getOne);
        this.router.post('/', productsController_1.productsController.create);
        this.router.put('/:id', productsController_1.productsController.update);
        this.router.delete('/:id', productsController_1.productsController.delete);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
