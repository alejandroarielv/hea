import { Request, Response } from 'express';
import pool from '../database';

class Product_shippingTypeController {

    public async list(req: Request, res: Response): Promise<any> {

        const product_shippingTypes = (await pool).query('select * from product_shippingTypes where productID = ?', [req.params.id])
            .then((product_shippingTypes) => {
                res.status(200).json({ message: 'Listed.', product_shippingTypes })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from product_shippingTypes where id = ?', [req.params.id])
            .then((product_shippingTypes) => {

                if (Array.isArray(product_shippingTypes) && product_shippingTypes.length > 0) {
                    res.status(200).json({ message: 'Listed.', product_shippingTypes });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into product_shippingTypes set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update product_shippingTypes set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from product_shippingTypes where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const product_shippingTypesController = new Product_shippingTypeController();