import { Request, Response } from 'express';
import pool from '../database';

class BrandsController {

    public async list(req: Request, res: Response): Promise<any> {

        const brands = (await pool).query('select * from brands')
            .then((brands) => {
                res.status(200).json({ message: 'Listed.', brands })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from brands where id = ?', [req.params.id])
            .then((brands) => {

                if (Array.isArray(brands) && brands.length > 0) {
                    res.status(200).json({ message: 'Listed.', brands });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into brands set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update brands set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from brands where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const brandsController = new BrandsController();