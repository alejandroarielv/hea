import { Request, Response } from 'express';
import pool from '../database';

class ProductsController {

    public async list(req: Request, res: Response): Promise<any> {

        (await pool)
            .query(`"
                select json_object('id', p.id, 'description', p.description, 'shortDescription', p.shortDescription, 
                    'about', p.about, 'sku', p.sku, 'barCode', p.barCode, 'minimunStock', p.minimunStock, 
                    'criticalStock', p.criticalStock, 'maximunStock', p.maximunStock, 'brandID', p.brandID, 
                    'image', p.image, 'enabled', p.enabled, 'created', p.created, 'brandDescription', b.description, 
                    'brandShortDescription', b.shortDescription) from products as p, brands as b where p.brandID = b.id;"`)
            .then((products) => {
                res.status(200).json({ message: 'Listed.', products })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        (await pool).query('select * from products where id = ?', [req.params.id])
            .then((products) => {

                if (Array.isArray(products) && products.length > 0) {
                    res.status(200).json({ message: 'Listed.', products });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into products set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
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