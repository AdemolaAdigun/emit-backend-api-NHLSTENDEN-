import {Router} from 'express';
import authenticate from '../middleware/authenticate';
import asyncWrapper from '../middleware/asyncWrapper';
import ordersController from '../controllers/orders'

const {verifyToken} = authenticate;

const {
    getOrderById,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,

} = ordersController;

const router = Router();

/**
 * @swagger
 * /orders/:id
 *  get:
 *      description: Used for getting a order by id
 *      response:
 *          '200':
 *          description: answer.
 */
router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getOrderById)
);

/**
 * @swagger
 * /orders/:
 *  get:
 *      description: Used for getting all orders
 *      response:
 *          '200':
 *          description: answer.
 */
router.get(
    '/',
    verifyToken,
    asyncWrapper(getOrders)
);

/*
router.post(
    '/create',
    verifyToken,
    asyncWrapper(createOrder)
);
 */

/*
router.put(
    '/update/:id',
    verifyToken,
    asyncWrapper(updateOrder)
);
*/
/**
 * @swagger
 * /orders/:id
 *  delete:
 *      description: Used for deleting an order
 *      response:
 *          '200':
 *          description: answer.
 */
router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteOrder)
);

export default router;
