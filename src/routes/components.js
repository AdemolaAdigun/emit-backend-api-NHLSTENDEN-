import {Router} from 'express';
import authenticate from '../middleware/authenticate';
import asyncWrapper from '../middleware/asyncWrapper';
import componentsController from "../controllers/components.js";

const {verifyToken} = authenticate;
const {
    getComponentById,
    getAllComponents,
    createComponent,
    updateComponent,
    deleteComponent,
    getTemplates,
    createTemplate,
    deleteTemplate,
    getFields,
    createField,
    deleteField,
    addAnswerToComponent,
    updateFieldAnswer,

} = componentsController;

const router = Router();

/**
 * @swagger
 * /components/:id:
 *  get:
 *      description: Used for getting a component
 *      response:
 *          '200':
 *          description: Component.
 */
router.get(
    '/:id',
    verifyToken,
    asyncWrapper(getComponentById)
);

/**
 * @swagger
 * /components/:
 *  get:
 *      description: Used for getting all components
 *      response:
 *          '200':
 *          description: Components.
 */
router.get(
    '/',
    verifyToken,
    asyncWrapper(getAllComponents)
);

/**
 * @swagger
 * /components/create:
 *  post:
 *      description: Used for creating components
 *      response:
 *          '200':
 *          description: Components.
 */
router.post(
    '/create',
    verifyToken,
    asyncWrapper(createComponent)
);

/**
 * @swagger
 * /components/fields/create/:templateId:
 *  post:
 *      description: Used for creating fields
 *      response:
 *          '200':
 *          description: field.
 */
router.post(
    '/fields/create/:templateId',
    verifyToken,
    asyncWrapper(createField),
);

/**
 * @swagger
 * /components/fields/delete/:fieldId:
 *  delete:
 *      description: Used for deleting fields
 *      response:
 *          '200':
 *          description: field.
 */
router.delete(
    '/fields/delete/:fieldId',
    verifyToken,
    asyncWrapper(deleteField)
);

/**
 * @swagger
 * /components/:componentId/fields/:fieldId/answer
 *  post:
 *      description: Used for adding answer to fields in components
 *      response:
 *          '200':
 *          description: answer.
 */
router.post(
    '/:componentId/fields/:fieldId/answer',
    verifyToken,
    asyncWrapper(addAnswerToComponent),
);
/**
 * @swagger
 * /components/:componentId/fields/:fieldId/answer-update/:fieldAnswerId
 *  post:
 *      description: Used for updating answer to fields in components
 *      response:
 *          '200':
 *          description: answer.
 */
router.put(
    '/:componentId/fields/:fieldId/answer-update/:fieldAnswerId',
    verifyToken,
    asyncWrapper(updateFieldAnswer),
);

/**
 * @swagger
 * /components/update/:id
 *  post:
 *      description: Used for updating components
 *      response:
 *          '200':
 *          description: answer.
 */
router.put(
    '/update/:id',
    verifyToken,
    asyncWrapper(updateComponent)
);

/**
 * @swagger
 * /components/delete/:id
 *  post:
 *      description: Used for deleting components
 *      response:
 *          '200':
 *          description: answer.
 */
router.delete(
    '/delete/:id',
    verifyToken,
    asyncWrapper(deleteComponent)
);

/**
 * @swagger
 * /components/templates/all
 *  get:
 *      description: Used for getting templates
 *      response:
 *          '200':
 *          description: answer.
 */
router.get(
    '/templates/all',
    verifyToken,
    asyncWrapper(getTemplates)
);

/**
 * @swagger
 * /components/templates/create
 *  post:
 *      description: Used for creating templates
 *      response:
 *          '200':
 *          description: answer.
 */
router.post(
    '/templates/create',
    verifyToken,
    asyncWrapper(createTemplate)
);

/**
 * @swagger
 * /components/templates/delete/:id
 *  delete:
 *      description: Used for deleting templates
 *      response:
 *          '200':
 *          description: answer.
 */
router.delete(
    '/templates/delete/:id',
    verifyToken,
    asyncWrapper(deleteTemplate)
);

/**
 * @swagger
 * /components/getFields/all
 *  delete:
 *      description: Used for deleting templates
 *      response:
 *          '200':
 *          description: answer.
 */
router.get(
    '/getFields/all',
    verifyToken,
    asyncWrapper(getFields)
);

export default router;
