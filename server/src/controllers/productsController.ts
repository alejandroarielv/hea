import { Request, Response } from 'express';
import pool from '../database';

class ProductsController {

    public async list(req: Request, res: Response): Promise<any> {

        const query = `SELECT JSON_OBJECT(
                        'id', id, 'description', description, 'shortDescription', shortDescription, 
                        'about', about, 'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
                        'criticalStock', criticalStock, 'maximunStock', maximunStock,
                        'brandID', brandID, 'image', image, 'enabled', enabled, 'created', created,
                        'brand', JSON_EXTRACT(
                                        IFNULL(
                                            (
                                        SELECT CONCAT('[',
                                            GROUP_CONCAT(
                                                JSON_OBJECT(
                                                    'id', id, 'description', description, 
                                                    'shortDescription', shortDescription,
                                                    'enabled', enabled, 'created', created
                                                )
                                            ),']'
                                        ) FROM brands WHERE id = p.id),'[]'),'$')
                                ) products FROM products p;`;                        
        // {"id": 1, "description": "Vino cabernet", "child_objects": [{"brand_id": 1, "brand_description": "Bodega López"}]}
        
        (await pool)
            .query(query)
            .then((products) => {
                res.status(200).json({ products })
            });
    }


    public async getOne(req: Request, res: Response): Promise<any> {

        const query = `SELECT JSON_OBJECT(
                        'id', id, 'description', description, 'shortDescription', shortDescription, 
                        'about', about, 'sku', sku, 'barCode', barCode, 'minimunStock', minimunStock, 
                        'criticalStock', criticalStock, 'maximunStock', maximunStock,
                        'brandID', brandID, 'image', image, 'enabled', enabled, 'created', created,
                        'brand', JSON_EXTRACT(
                            IFNULL(
                                (
                            SELECT CONCAT('[',
                                GROUP_CONCAT(
                                    JSON_OBJECT(
                                        'id', id, 'description', description, 
                                        'shortDescription', shortDescription,
                                        'enabled', enabled, 'created', created
                                    )
                                ),']'
                            ) brands FROM brands WHERE id = p.id),'[]'),'$')
                        ) products FROM products p where id = ?;`;                        

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