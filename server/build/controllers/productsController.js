"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT JSON_OBJECT(
                        'id', id, 'description', description, 'shortDescription', shortDescription, 
                        'about', about, 'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
                        'criticalStock', criticalStock, 'maximunStock', maximunStock,
                        'brandID', brandID, 'image', image, 'enabled', enabled, 'created', created,
                        'child_objects', JSON_EXTRACT(
                                        IFNULL(
                                            (
                                        SELECT CONCAT('[',
                                            GROUP_CONCAT(
                                                JSON_OBJECT(
                                                    'id', id, 'description', description, 
                                                    'shortDescription', shortDescription,
                                                    'enabled', enabled, 'created', created
                                                    )
                                            ),']')   
                                            FROM brands WHERE id = p.id),'[]'),'$')
                                ) products FROM products p;`;
            // {"id": 1, "description": "Vino cabernet", "child_objects": [{"brand_id": 1, "brand_description": "Bodega López"}]}
            (yield database_1.default)
                .query(query)
                .then((products) => {
                res.status(200).json({ products });
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT JSON_OBJECT(
            'id', id, 'description', description, 'shortDescription', shortDescription, 
            'about', about, 'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
            'criticalStock', criticalStock, 'maximunStock', maximunStock,
            'brandID', brandID, 'image', image, 'enabled', enabled, 'created', created,
            'child_objects', JSON_EXTRACT(
                            IFNULL(
                                (
                            SELECT CONCAT('[',
                                GROUP_CONCAT(
                                    JSON_OBJECT(
                                        'id', id, 'description', description, 
                                        'shortDescription', shortDescription,
                                        'enabled', enabled, 'created', created
                                        )
                                ),']')   
                                FROM brands WHERE id = p.id),'[]'),'$')
                    ) products FROM products p where id = ?;`;
            (yield database_1.default).query(query, [req.params.id])
                .then((products) => {
                if (Array.isArray(products) && products.length > 0) {
                    res.status(200).json({ products });
                }
                else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('insert into products set ?', [req.body]);
            res.status(200).json({ message: 'Created.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query('update products set ? where id = ?', [req.body, id]);
            res.status(200).json({ message: 'Updated.' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('delete from products where id = ?', [req.params.id]);
            res.status(200).json({ message: 'Deleted.' });
        });
    }
}
exports.productsController = new ProductsController();
