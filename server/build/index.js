"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const properties_reader_1 = __importDefault(require("properties-reader"));
const express_1 = __importDefault(require("express"));
const labelsRoutes_1 = __importDefault(require("./routes/labelsRoutes"));
const brandsRoutes_1 = __importDefault(require("./routes/brandsRoutes"));
const measurementUnitsRoutes_1 = __importDefault(require("./routes/measurementUnitsRoutes"));
const shippingTypesRoutes_1 = __importDefault(require("./routes/shippingTypesRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || properties.get('sever.port'));
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/labels', labelsRoutes_1.default);
        this.app.use('/api/brands', brandsRoutes_1.default);
        this.app.use('/api/measurementUnits', measurementUnitsRoutes_1.default);
        this.app.use('/api/shippingTypes', shippingTypesRoutes_1.default);
        this.app.use('/api/products', productsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('listening on port ', this.app.get('port'));
        });
    }
}
const properties = properties_reader_1.default('app.properties');
const server = new Server();
server.start();
