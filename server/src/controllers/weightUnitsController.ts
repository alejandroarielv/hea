import { Request, Response } from 'express';
import pool from '../database';

class WeightUnitsController {

    public async list(req: Request, res: Response): Promise<any> {

        const weightUnits = (await pool).query('select * from weightUnits')
            .then((weightUnits) => {
                res.status(200).json({ message: 'Listed.', weightUnits })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from weightUnits where id = ?', [req.params.id])
            .then((weightUnits) => {

                if (Array.isArray(weightUnits) && weightUnits.length > 0) {
                    res.status(200).json({ message: 'Listed.', weightUnits });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into weightUnits set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update weightUnits set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from weightUnits where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const weightUnitsController = new WeightUnitsController();