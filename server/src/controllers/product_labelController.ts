import { Request, Response } from 'express';
import pool from '../database';

class Product_labelController {

    public async list(req: Request, res: Response): Promise<any> {

        const product_labels = (await pool).query('select * from product_labels where productID = ?', [req.params.id])
            .then((product_labels) => {
                res.status(200).json({ message: 'Listed.', product_labels })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from product_labels where id = ?', [req.params.id])
            .then((product_labels) => {

                if (Array.isArray(product_labels) && product_labels.length > 0) {
                    res.status(200).json({ message: 'Listed.', product_labels });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into product_labels set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update product_labels set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from product_labels where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const product_labelsController = new Product_labelController();