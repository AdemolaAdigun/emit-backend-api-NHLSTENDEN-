import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import asyncWrapper from '../middleware/asyncWrapper';
import Uploads from '../services/attachmentUpload';
import projectsController from '../controllers/projects.js'


const {verifyToken} = authenticate;
const {
    getProjectsById,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    removeAttachment,
    addAttachment,

} = projectsController;

const router = Router();

/**
 * @swagger
 * /projects/:id:
 *  get:
 *      description: Used for getting a project by id
 *      response:
 *          '200':
 *          description:
 */
router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getProjectsById),
);

/**
 * @swagger
 * /projects:
 *  get:
 *      description: Used for getting all the projects
 *      response:
 *          '200':
 *          description:
 */
router.get(
    '/',
    verifyToken,
    asyncWrapper(getProjects)
);

/**
 * @swagger
 * /projects/create:
 *  post:
 *      description: Used for creating a project
 *      response:
 *          '200':
 *          description:
 */
router.post(
    '/create',
    verifyToken,
    Uploads.any(),
    asyncWrapper(createProject)
);

/**
 * @swagger
 * /projects/update/:id:
 *  put:
 *      description: Used for updating a project
 *      response:
 *          '200':
 *          description:
 */
router.put(
    '/update/:id',
    verifyToken,
    asyncWrapper(updateProject)
);

/**
 * @swagger
 * /projects/delete/:id:
 *  delete:
 *      description: Used for deleting a project
 *      response:
 *          '200':
 *          description:
 */
router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteProject)
);

/**
 * @swagger
 * /projects/:projectId/add-attachment:
 *  post:
 *      description: Used for adding an attachment
 *      response:
 *          '200':
 *          description:
 */
router.post(
    '/:projectId/add-attachment',
    Uploads.any(),
    verifyToken,
    asyncWrapper(addAttachment)
);

/**
 * @swagger
 * /projects/remove-attachment/:attachmentId:
 *  delete:
 *      description: Used for removing an attachment
 *      response:
 *          '200':
 *          description:
 */
router.delete(
    '/remove-attachment/:attachmentId',
    verifyToken,
    asyncWrapper(removeAttachment)
);

export default router;
