import * as bcrypt from 'bcrypt'
import * as connections from '../../config/connection/connection'
import * as crypto from 'crypto'
import { Document, Schema } from 'mongoose'
import { NextFunction } from 'express'

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {

    firstName: string

    lastName: string

    email: string

    mobileNumber: string

    password: string

    passwordResetToken: string

    passwordResetExpires: Date

    tokens: AuthToken[]

    comparePassword: (password: string) => Promise<boolean>
    gravatar: (size: number) => string
}

export type AuthToken = {
    accessToken: string
    kind: string
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - mobileNumber
 *        - password
 *      properties:
 *        id: 
 *          type: string
 *        firstName: 
 *          type: string
 *        lastName: 
 *          type: string
 *        email: 
 *          type: string
 *        mobileNumber: 
 *          type: string
 *        password: 
 *          type: string
 *        passwordResetToken: 
 *          type: string
 *        passwordResetExpires: 
 *          type: string 
 *          format: date
 *        tokens: 
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        mobileNumber: String,
        password: String,
        passwordResetToken: String,
        passwordResetExpires: Date,
        tokens: Array,
    }).pre('save', async function (next: NextFunction): Promise<void> {
    const user: any = this // tslint:disable-line

    if (!user.isModified('password')) {
        return next()
    }

    try {
        const salt: string = await bcrypt.genSalt(10)

        const hash: string = await bcrypt.hash(user.password, salt)

        user.password = hash
        next()
    } catch (error) {
        return next(error)
    }
})

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password)

        return match
    } catch (error) {
        return error
    }
}

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`
    }
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

export default connections.db.model<IUserModel>('User', UserSchema)
