import { Request, Response } from 'express';
import pool from '../database';

class ProductsController {

    public async list(req: Request, res: Response): Promise<any> {

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

        (await pool)
            .query(query)
            .then((products) => {
                res.status(200).json({ products })
            });
    }


    public async getOne(req: Request, res: Response): Promise<any> {

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

        (await pool).query(query, [req.params.id])
            .then((products) => {

                if (Array.isArray(products) && products.length > 0) {
                    res.status(200).json({ products });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {

        const conn = (await pool).getConnection();
        (await conn).query('insert into products set ?;', [req.body]);
        (await conn).query('select LAST_INSERT_ID() as ID;')
            .then((newID) => {
                res.status(200).json({ message: 'Created.', newID });
            });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update products set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from products where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const productsController = new ProductsController();