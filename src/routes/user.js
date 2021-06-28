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

router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getUserById)
);

router.get(
    '/',
    verifyToken,
    asyncWrapper(getUsers)
);

router.post(
    '/create',
    verifyToken,
    asyncWrapper(createUser)
);

router.put(
    '/update',
    verifyToken,
    asyncWrapper(updateUser)
);

router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteUser)
);

export default router;
