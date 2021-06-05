import { IHostelModel } from './model'

/**
 * @export
 * @interface IHostelService
 */
export interface IHostelService {
    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IHostelService
     */
    findAll(): Promise<IHostelModel[]>

    /**
     * @param {string} code
     * @returns {Promise<IHostelModel>}
     * @memberof IHostelService
     */
    findOne(code: string): Promise<IHostelModel>

    /**
     * @param {IHostelModel} IHostelModel
     * @returns {Promise<IHostelModel>}
     * @memberof IHostelService
     */
    insert(IHostelModel: IHostelModel): Promise<IHostelModel>
}
