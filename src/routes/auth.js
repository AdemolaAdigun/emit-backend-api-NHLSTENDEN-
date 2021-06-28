import {Router} from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import authController from '../controllers/auth'
import authenticate from "../middleware/authenticate";

const router = Router();
const {verifyToken} = authenticate;
const {loginUser, whoAmI} = authController

/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Used for login
 *      parameters:
 *      response:
 *          '200':
 *          description: data object with user and token inside.
 */
router.post('/login',
    asyncWrapper(loginUser),
);

/**
 * @swagger
 * /auth/whoami:
 *  get:
 *      description: Used for knowing user role
 *      parameters:
 *      response:
 *          '200':
 *          description: data object with user and token inside.
 */
router.get('/whoami',
    verifyToken,
    asyncWrapper(whoAmI),
);

export default router;
