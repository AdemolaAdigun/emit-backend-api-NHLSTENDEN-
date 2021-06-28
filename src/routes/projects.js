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

router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getProjectsById),
);

router.get(
    '/',
    verifyToken,
    asyncWrapper(getProjects)
);

router.post(
    '/create',
    verifyToken,
    Uploads.any(),
    asyncWrapper(createProject)
);

router.put(
    '/update/:id',
    verifyToken,
    asyncWrapper(updateProject)
);

router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteProject)
);

router.post(
    '/:projectId/add-attachment',
    Uploads.any(),
    verifyToken,
    asyncWrapper(addAttachment)
);

router.delete(
    '/remove-attachment/:attachmentId',
    verifyToken,
    asyncWrapper(removeAttachment)
);

export default router;
