
import { IProductAttribute } from '../models/productAttribute';

export interface IProductFeature {
    id?: number,
    productID: number,
    productAttribute: IProductAttribute,
    about: string,
    created?: Date
}