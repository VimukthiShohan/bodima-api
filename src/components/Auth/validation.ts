import * as Joi from 'joi'
import Validation from '../validation'
import { IUserModel } from '../User/model'

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
     */
    constructor() {
        super()
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            mobileNumber: Joi.string().length(10).required(),
            password: Joi.string().required(),
        })

        return Joi.validate(params, schema)
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    getUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainAtoms: 2,
                })
                .required(),
        })

        return Joi.validate(params, schema)
    }
}

export default new AuthValidation()
