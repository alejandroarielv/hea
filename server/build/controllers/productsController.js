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
                                    'id', product.id, 'description', product.description, 
                                    'shortDescription', product.shortDescription, 'about', about, 
                                    'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
                                    'criticalStock', criticalStock, 'maximunStock', maximunStock,
                                    'brandID', brandID, 'image', image, 'enabledToSell', product.enabledToSell, 
                                    'enabledToBuy', product.enabledToBuy, 'created', product.created, 
                                    'brand', JSON_OBJECT(
                                                        'id', brand.id, 'description', brand.description, 
                                                        'shortDescription', brand.shortDescription,
                                                        'enabled', brand.enabled, 'created', brand.created)) as product
                        FROM products as product JOIN brands as brand ON product.brandID=brand.id;`;
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
            'id', product.id, 'description', product.description, 
            'shortDescription', product.shortDescription, 'about', about, 
            'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
            'criticalStock', criticalStock, 'maximunStock', maximunStock,
            'brandID', brandID, 'image', image, 'enabledToSell', product.enabledToSell, 
            'enabledToBuy', product.enabledToBuy,'created', product.created, 
            'brand', JSON_OBJECT(
                                'id', brand.id, 'description', brand.description, 
                                'shortDescription', brand.shortDescription,
                                'enabled', brand.enabled, 'created', brand.created)) as product
            FROM products as product JOIN brands as brand ON product.brandID=brand.id;
            WHERE product.id = ?;`;
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
            const conn = (yield database_1.default).getConnection();
            (yield conn).query('insert into products set ?;', [req.body]);
            (yield conn).query('select LAST_INSERT_ID() as ID;')
                .then((newID) => {
                res.status(200).json({ message: 'Created.', newID });
            });
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
