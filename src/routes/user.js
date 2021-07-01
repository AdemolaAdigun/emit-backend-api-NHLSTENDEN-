import {Router} from 'express';
import authenticate from '../middleware/authenticate';
import asyncWrapper from '../middleware/asyncWrapper';
import usersController from "../controllers/user.js"

const {verifyToken} = authenticate;
const {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,

} = usersController;

const router = Router();

/**
 * @swagger
 * /users/:id:
 *  get:
 *      description: Used for getting a user by id
 *      response:
 *          '200':
 *          description:
 */
router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getUserById)
);

/**
 * @swagger
 * /users/:
 *  get:
 *      description: Used for getting all the users
 *      response:
 *          '200':
 *          description:
 */
router.get(
    '/',
    verifyToken,
    asyncWrapper(getUsers)
);

/**
 * @swagger
 * /users/create
 *  post:
 *      description: Used for creating a new user
 *      response:
 *          '200':
 *          description:
 */
router.post(
    '/create',
    verifyToken,
    asyncWrapper(createUser)
);

/**
 * @swagger
 * /users/update
 *  put:
 *      description: Used for updating an user
 *      response:
 *          '200':
 *          description:
 */
router.put(
    '/update',
    verifyToken,
    asyncWrapper(updateUser)
);

/**
 * @swagger
 * /users/delete/:id
 *  delete:
 *      description: Used for deleting an user
 *      response:
 *          '200':
 *          description:
 */
router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteUser)
);

export default router;
