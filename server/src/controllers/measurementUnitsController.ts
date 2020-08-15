import { Request, Response } from 'express';
import pool from '../database';

class MeasurementUnitsController {

    public async list(req: Request, res: Response): Promise<any> {

        const measurementUnits = (await pool).query('select * from measurementUnits')
            .then((measurementUnits) => {
                res.status(200).json({ message: 'Listed.', measurementUnits })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from measurementUnits where id = ?', [req.params.id])
            .then((measurementUnits) => {

                if (Array.isArray(measurementUnits) && measurementUnits.length > 0) {
                    res.status(200).json({ message: 'Listed.', measurementUnits });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into measurementUnits set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update measurementUnits set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from measurementUnits where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const measurementUnitsController = new MeasurementUnitsController();