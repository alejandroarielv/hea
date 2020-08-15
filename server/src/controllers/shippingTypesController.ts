import { Request, Response } from 'express';
import pool from '../database';

class ShippingTypesController {

    public async list(req: Request, res: Response): Promise<any> {

        const shippingTypes = (await pool).query('select * from shippingTypes')
            .then((shippingTypes) => {
                res.status(200).json({ message: 'Listed.', shippingTypes })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from shippingTypes where id = ?', [req.params.id])
            .then((shippingTypes) => {

                if (Array.isArray(shippingTypes) && shippingTypes.length > 0) {
                    res.status(200).json({ message: 'Listed.', shippingTypes });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into shippingTypes set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update shippingTypes set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from shippingTypes where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const shippingTypesController = new ShippingTypesController();