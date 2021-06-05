import { HostelComponent } from '../components'
import { Router } from 'express'

/**
 * @constant {express.Router}
 */
const router: Router = Router()

/**
 * GET method route
 * @example http://localhost:PORT/v1/hostel
 *
 * @swagger
 * /v1/hostel:
 *   get:
 *     description: Get all stored hostels in Database
 *     tags: ["hostels"]
 *     security:
 *      - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: An array of hostels
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Hostels'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
 router.get('/', HostelComponent.findAll)

/**
 * GET method route
 * @example http://localhost:PORT/v1/hostel/:code
 *
 * @swagger
 * /v1/hostel/{code}:
 *   get:
 *     description: Get hostel by code in Database
 *     tags: ["hostels"]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *      - in: path
 *        name: code
 *        description: the unique code of hostel
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: An array of hostel
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Hostel'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
 router.get('/:code', HostelComponent.findOne)

/**
 * POST method route
 * @example http://localhost:PORT/v1/hostel/create
 * @swagger
 * /v1/hostel/create:
 *  post:
 *    description: sign up user to application
 *    tags: ["hostels"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/HostelSchema'
 *          example:
 *            code: sjs
 *            hostelName: sjs hostels (pvt) ltd.
 *            contactNumber: 0712345678
 *            location: {logitude: 51.121631684, latitude: 45.16846831}
 *            address: 357/1, new kandy road, malabe, sri lanka.
 *            distanceToMainRoad: 800m
 *            owner: sandun@gmail.com
 *    responses:
 *      200:
 *        description: Hostel successfuly created
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Hostel creation successfull!!
 *      400:
 *        description: Hostel creation failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: code already exists
 */
router.post('/create', HostelComponent.create)

/**
 * @export {express.Router}
 */
export default router
