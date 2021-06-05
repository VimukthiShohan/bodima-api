import * as Joi from 'joi'
import Validation from '../validation'
import { IHostelModel } from './model'

/**
 * @export
 * @class HostelValidation
 * @extends Validation
 */
class HostelValidation extends Validation {
    /**
     * Creates an instance of HostelValidation.
     * @memberof HostelValidation
     */
    constructor() {
        super()
    }

    /**
     * @param {IHostelModel} params
     * @returns {Joi.ValidationResult<IHostelModel >}
     * @memberof HostelValidation
     */
    createHostel(params: IHostelModel): Joi.ValidationResult<IHostelModel> {
        const schema: Joi.Schema = Joi.object().keys({
            code: Joi.string().required(),
            hostelName: Joi.string().required(),
            contactNumber: Joi.string().required(),
            location: Joi.string().required(),
            address: Joi.string().required(),
            distanceToMainRoad: Joi.string().required(),
            owner: Joi.string().required().email(),
        })

        return Joi.validate(params, schema)
    }

    /**
     * @param {{ code: string }} body
     * @returns {Joi.ValidationResult<{ code: string }>}
     * @memberof HostelValidation
     */
    getHostel(body: {
        code: string
    }): Joi.ValidationResult<{
        code: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            code: Joi.string().required(),
        })

        return Joi.validate(body, schema)
    }
}

export default new HostelValidation()
