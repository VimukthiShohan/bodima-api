import * as connections from "../../config/connection/connection";
import { Document, Schema, Types } from "mongoose";

/**
 * @export
 * @interface IHostelModel
 * @extends {Document}
 */
export interface IHostelModel extends Document {
  code: string;

  hostelName: string;

  description: string;

  hostelPicsArray: string[];

  contactNumber: string;

  location: Location;

  hostelRestrictions: string;

  address: string;

  facilityParking: boolean;

  facilityKitchen: boolean;

  distanceToMainRoad: string;

  rdNIC: string;

  rdPoliceReport: string;

  rdOtherDocuments: string[];

  owner: Types.ObjectId;
}

export type Location = {
  longitude: number;
  latitude: number;
};

/**
 * @swagger
 * components:
 *  schemas:
 *    HostelSchema:
 *      required:
 *        - hostelName
 *        - contactNumber
 *        - location
 *        - address
 *        - distanceToMainRoad
 *        - owner
 *      properties:
 *        _id:
 *          type: ObjectID
 *        hostelName:
 *          type: string
 *        contactNumber:
 *          type: string
 *        location:
 *          type: object
 *        address:
 *          type: string
 *        distanceToMainRoad:
 *          type: string
 *        owner:
 *          type: string
 *        description:
 *          type: string
 *        hostelRestrictions:
 *          type: string
 *    Hostels:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/HostelSchema'
 */
const HostelSchema: Schema = new Schema({
  code: String,

  hostelName: String,

  description: String,

  hostelPicsArray: [String],

  contactNumber: String,

  location: Object,

  hostelRestrictions: String,

  address: String,

  facilityParking: Boolean,

  facilityKitchen: Boolean,

  distanceToMainRoad: String,

  rdNIC: String,

  rdPoliceReport: String,

  rdOtherDocuments: [String],

  owner: { type: Types.ObjectId, ref: "User" },
});

export default connections.db.model<IHostelModel>("Hostel", HostelSchema);
