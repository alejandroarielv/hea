import { Request, Response } from 'express';
import pool from '../database';

class Product_featureController {

    public async list(req: Request, res: Response): Promise<any> {

        const product_features = (await pool).query('select * from product_features where productID = ?', [req.params.id])
            .then((product_features) => {
                res.status(200).json({ message: 'Listed.', product_features })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from product_features where id = ?', [req.params.id])
            .then((product_features) => {

                if (Array.isArray(product_features) && product_features.length > 0) {
                    res.status(200).json({ message: 'Listed.', product_features });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {



        (await pool).query('insert into product_features set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }



    public async update(req: Request, res: Response): Promise<void> {
        
        
        const { id } = req.params;

        (await pool).query('update product_features set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }


    public async delete(req: Request, res: Response): Promise<void> {
        
        (await pool).query('delete from product_features where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const product_featuresController = new Product_featureController();