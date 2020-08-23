"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandsController_1 = require("../controllers/brandsController");
class BrandsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', brandsController_1.brandsController.list);
        this.router.get('/:id', brandsController_1.brandsController.getOne);
        this.router.post('/', brandsController_1.brandsController.create);
        this.router.put('/:id', brandsController_1.brandsController.update);
        this.router.delete('/:id', brandsController_1.brandsController.delete);
    }
}
const brandsRoutes = new BrandsRoutes();
exports.default = brandsRoutes.router;
