import { IBrand } from './brand';

export interface IProduct {
    id?: number;
    description: string;
    shortDescription: string;
    about?: string,
    sku: string,
    barCode?: number,
    minimunStock: number,
    criticalStock: number,
    maximunStock: number,
    brandID: number,
    enabledToBuy: boolean;
    enabledToSell: boolean;
    image?: string;
    created?: Date
    brand: IBrand;
}


