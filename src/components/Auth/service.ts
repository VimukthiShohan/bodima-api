import * as Joi from 'joi'
import AuthValidation from './validation'
import User, { IUserModel } from '../User/model'
import { IAuthService } from './interface'

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {
  /**
   * @param {IUserModel} body
   * @returns {Promise <IUserModel>}
   * @memberof AuthService
   */
  async createUser(body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<IUserModel> = AuthValidation.createUser(body)

      if (validate.error) {
        throw new Error(validate.error.message)
      }

      const user: IUserModel = new User({
        firstName: validate.value.firstName,
        lastName: validate.value.lastName,
        email: validate.value.email,
        mobileNumber: validate.value.mobileNumber,
        password: validate.value.password
      })
      
      const query: IUserModel = await User.findOne({
        email: body.email,
      })

      if (query) {
        throw new Error('This email already exists')
      }

      const saved: IUserModel = await user.save()

      return saved
    } catch (error) {
      throw new Error(error)
    }
  },
  /**
   * @param {IUserModel} body
   * @returns {Promise <IUserModel>}
   * @memberof AuthService
   */
  async getUser(body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult<IUserModel> = AuthValidation.getUser(body)

      if (validate.error) {
        throw new Error(validate.error.message)
      }

      const user: IUserModel = await User.findOne({
        email: body.email,
      })

      const isMatched: boolean = user && (await user.comparePassword(body.password))

      if (isMatched) {
        return user
      }

      throw new Error('Invalid password or email')
    } catch (error) {
      throw new Error(error)
    }
  },
}

export default AuthService
