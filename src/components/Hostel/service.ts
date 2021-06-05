import * as Joi from "joi";
import Hostel, { IHostelModel } from "./model";
import User, { IUserModel } from "../User/model";
import HostelValidation from "./validation";
import { IHostelService } from "./interface";

/**
 * @export
 * @implements {IHostelService}
 */
const HostelService: IHostelService = {
  /**
   * @returns {Promise < IHostelModel[] >}
   * @memberof UserService
   */
  async findAll(): Promise<IHostelModel[]> {
    try {
      return await Hostel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} code
   * @returns {Promise < IHostelModel >}
   * @memberof UserService
   */
  async findOne(code: string): Promise<IHostelModel> {
    try {
      const validate: Joi.ValidationResult<{ code: string }> =
        HostelValidation.getHostel({ code });
      if (validate.error) throw new Error(validate.error.message);

      return await Hostel.findOne({ code });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IHostelModel} user
   * @returns {Promise < IHostelModel >}
   * @memberof UserService
   */
  async insert(body: IHostelModel): Promise<IHostelModel> {
    try {
      const validate: Joi.ValidationResult<IHostelModel> =
        HostelValidation.createHostel(body);

      if (validate.error) throw new Error(validate.error.message);

      const owner = await User.findOne({email: body.owner});

      return await Hostel.create({...body, owner});
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default HostelService;
