import HostelService from './service'
import { HttpError } from '../../config/error'
import { IHostelModel } from './model'
import { NextFunction, Request, Response } from 'express'

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const hostels: IHostelModel[] = await HostelService.findAll()

        res.status(200).json(hostels)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const hostel: IHostelModel = await HostelService.findOne(req.params.code)

        res.status(200).json(hostel)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const hostel: IHostelModel = await HostelService.insert(req.body)

        res.status(201).json(hostel)
    } catch (error) {
        next(new HttpError(error.message.status, error.message))
    }
}

