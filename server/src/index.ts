import PropertiesReader from 'properties-reader';
import express, { Application } from 'express';

import indexRoutes from './routes/indexRoutes';
import labelsRoutes from './routes/labelsRoutes';
import brandsRoutes from './routes/brandsRoutes';
import measurementUnitsRoutes from './routes/measurementUnitsRoutes';
import shippingTypesRoutes from './routes/shippingTypesRoutes';
import productsRoutes from './routes/productsRoutes';

import morgan from 'morgan';
import cors from 'cors';

class Server {

    app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || properties.get('sever.port'));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));    
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/labels', labelsRoutes);
        this.app.use('/api/brands', brandsRoutes);
        this.app.use('/api/measurementUnits', measurementUnitsRoutes);
        this.app.use('/api/shippingTypes', shippingTypesRoutes);
        this.app.use('/api/products', productsRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('listening on port ', this.app.get('port'));
        });
    }
    
}

const properties = PropertiesReader('app.properties');

const server = new Server();
server.start();