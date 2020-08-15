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
exports.weightUnitsController = void 0;
const database_1 = __importDefault(require("../database"));
class WeightUnitsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const weightUnits = (yield database_1.default).query('select * from weightUnits')
                .then((weightUnits) => {
                res.status(200).json({ message: 'Listed.', weightUnits });
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = (yield database_1.default).query('select * from weightUnits where id = ?', [req.params.id])
                .then((weightUnits) => {
                if (Array.isArray(weightUnits) && weightUnits.length > 0) {
                    res.status(200).json({ message: 'Listed.', weightUnits });
                }
                else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('insert into weightUnits set ?', [req.body]);
            res.status(200).json({ message: 'Created.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (yield database_1.default).query('update weightUnits set ? where id = ?', [req.body, id]);
            res.status(200).json({ message: 'Updated.' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('delete from weightUnits where id = ?', [req.params.id]);
            res.status(200).json({ message: 'Deleted.' });
        });
    }
}
exports.weightUnitsController = new WeightUnitsController();
