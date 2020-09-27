
import { AbstractControl } from '@angular/forms';
import { IProductFeatureExtended, STATUS } from './product-feature-extended';

export class ProductFeatureValidator {

    static IsDuplicateAttribute(productAttributeIDControl: AbstractControl,
        productFeaturesExtended: IProductFeatureExtended[]): { [key: string]: any } | null {

        const indexInProductFeatureExtended: number = productFeaturesExtended
            .findIndex(el => el.productAttribute.id == productAttributeIDControl.value);

        if (indexInProductFeatureExtended != -1 &&
            productFeaturesExtended[indexInProductFeatureExtended].status != STATUS.DELETED) {

            IsDuplicateAttribute: true
        } else {
            return null
        }
    }

}
