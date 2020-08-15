import { Request, Response } from 'express';
import pool from '../database';

class LabelsController {

    public async list(req: Request, res: Response): Promise<any> {

        const labels = (await pool).query('select * from labels')
            .then((labels) => {
                res.status(200).json({ message: 'Listed.', labels })
            });
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        const game = (await pool).query('select * from labels where id = ?', [req.params.id])
            .then((labels) => {

                if (Array.isArray(labels) && labels.length > 0) {
                    res.status(200).json({ message: 'Listed.', labels });
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            });
    }

    public async create(req: Request, res: Response): Promise<void> {
        (await pool).query('insert into labels set ?', [req.body]);
        res.status(200).json({ message: 'Created.' })
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        (await pool).query('update labels set ? where id = ?', [req.body, id]);
        res.status(200).json({ message: 'Updated.' })
    }

    public async delete(req: Request, res: Response): Promise<void> {
        (await pool).query('delete from labels where id = ?', [req.params.id]);
        res.status(200).json({ message: 'Deleted.' })
    }
}

export const labelsController = new LabelsController();