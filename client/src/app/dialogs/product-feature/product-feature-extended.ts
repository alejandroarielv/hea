
import { IProductFeature } from '../../models/product-feature';

export const enum STATUS {
    ADDED,
    DELETED,
    UPDATED
}

export interface IProductFeatureExtended extends IProductFeature {
    status?: STATUS;
}
