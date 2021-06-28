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

router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getOrderById)
);

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

router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteOrder)
);

export default router;
