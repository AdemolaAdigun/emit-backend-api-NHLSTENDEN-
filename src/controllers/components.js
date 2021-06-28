import {config} from 'dotenv';
import Models from '../models';
import components from "../routes/components";
import asyncForEach from "../helpers/asyncForEach";
import {request, response} from "express";

config();

const {
    Components,
    Templates,
    Fields,
    Users,
    FieldAnswers,
    ProjectComponents,
} = Models;

export default {
    getComponentById: async (request, response) => {
        const {id} = request.params;

        const component = await Components.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Users,
                    attributes: ['firstname', 'firstname', 'email', 'avatar'],
                    as: 'author',
                },
                {
                    model: Templates,
                    attributes: ['name'],
                    include: [
                        {
                            model: Fields,
                            include: [
                                {
                                    model: FieldAnswers,
                                    where: {
                                        componentId: id,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
        });

        if (!component) {
            return response.status(404).json({
                status: 'error',
                message: 'Component not found.',
            });
        }

        return response.status(200).json({
            status: 'success',
            data: component,
        });
    },

    getAllComponents: async (request, response) => {
        const components = await Components.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['firstname', 'firstname', 'email', 'avatar'],
                    as: 'author',
                },
                {
                    model: Templates,
                    attributes: ['name'],
                    include: [
                        {
                            model: Fields,
                            include: [
                                {
                                    model: FieldAnswers,
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        return response.status(200)
            .json({
                status: 'success',
                data: components,
            });
    },

    createComponent: async (request, response) => {
        const {templateId, name, count} = request.body;
        const user = await request.user.dataValues;
        const template = await Templates.findOne({
            where: {
                id: templateId
            },
        });
        if (!template) {
            return response.status(404).json({
                status: 'error',
                message: 'invalid Template.',
            });
        }

        const nameExist = await Components.findOne({
            where: {
                name,
            },
        });

        if (nameExist) {
            return response.status(409).json({
                status: 'conflict',
                message: 'name already exists',
            });
        }

        const component = await Components.create({
            templateId,
            userId: user.id,
            name,
            count,
        });

        let list = [];
        list = await Fields.findAll({
            where: {
                templateId,
            }
        });

        await asyncForEach(list, async (field) => {
            await FieldAnswers.create({
                componentId: await component.dataValues.id,
                fieldId: await field.dataValues.id,
            })
        });

        return response.status(200)
            .json({
                status: 'success',
                data: component,
            });
    },

    updateComponent: async (request, response) => {
        const {componentId, fieldId} = request.params;

        const answers = await FieldAnswers.findOne({
            where: {
                componentId,
                fieldId,
            },
        });

        if (!answers) {
            return response.status(404).json({
                status: 'error',
                message: 'Invalid component.',
            });
        }

        await answers.update(request.body, {
            fields: Object.keys(request.body),
        });

        return response.status(200).json({
            message: 'success',
            data: answers,
        });
    },

    deleteComponent: async (request, response) => {
        const {id} = request.params;

        const doesExist = await Components.findOne({
            where: {
                id,
            },
        });

        if (!doesExist) {
            return response.status(404)
                .json({
                    status: 'not found',
                    message: 'component does not exist',
                });
        }
        const componentId = await id;
        const inAProject = await ProjectComponents.findOne({
            where: {},
        });

        if (inAProject) {
            return response.status(409)
                .json({
                    status: 'conflict',
                    message: 'component already exists in a project',
                });
        }

        await Components.destroy(id);

        return response.status(200)
            .json({
                status: 'success',
                message: 'component deleted successfully',
            });
    },

    getTemplates: async (request, response) => {
        const templates = await Templates.findAll({
            include: [
                {
                    model: Fields,
                    attributes: ['fieldName']
                }
            ]
        });
        return response.status(200)
            .json({
                status: 'success',
                data: templates,
            });
    },

    createTemplate: async (request, response) => {
        const {name} = request.body;

        const template = await Templates.create({
            name,
        });

        return response.status(200)
            .json({
                status: 'success',
                data: template,
            });
    },

    deleteTemplate: async (request, response) => {
        const {id} = request.params;

        const template = await Templates.findByPk(id);
        if (!template) {
            return response.status(404)
                .json({
                    status: 'not found',
                    message: 'template does not exist',
                });
        }

        await Templates.destroy({
            where: {
                id,
            }
        });

        return response.status(200)
            .json({
                status: 'success',
                message: 'template deleted successfully',
            });
    },

    getFields: async (request, response) => {

        const fields = await Fields.findAll({});

        return response.status(200)
            .json({
                status: 'success',
                data: fields,
            });
    },

    createField: async (request, response) => {
        const {templateId} = request.params;
        const {fieldName} = request.body;

        const field = await Fields.create({
            templateId,
            fieldName,
        });

        return response.status(200)
            .json({
                status: 'success',
                data: field,
            });
    },

    deleteField: async (request, response) => {
        const {fieldId} = request.params;

        const exist = await Fields.findOne({
            where: {
                id: fieldId,
            },
        });

        if (!exist) {
            return response.status(404)
                .json({
                    status: 'not found',
                    message: 'field does not exist',
                });
        }

        await FieldAnswers.destroy({
            where: {
                fieldId,
            }
        });

        await Fields.destroy({
            where: {
                id: fieldId,
            },
        });

        return response.status(200)
            .json({
                status: 'success',
                message: 'Field deleted successfully',
            });
    },

    addAnswerToComponent: async (request, response) => {
        const {componentId, fieldId} = request.params;
        const {answer} = request.body;

        const componentExist = await Components.findOne({
            where: {
                id: componentId,
            },
        });

        if (!componentExist) {
            return response.status(404)
                .json({
                    status: 'not found',
                    message: 'component does not exist',
                });
        }

        const fieldExist = await Fields.findOne({
            where: {
                id: fieldId,
            },
        });

        if (!fieldExist) {
            return response.status(404)
                .json({
                    status: 'not found',
                    message: 'field does not exist',
                });
        }

        await FieldAnswers.create({
            componentId,
            fieldId,
            answer,
        });

        return response.status(200)
            .json({
                status: 'success',
                message: 'field and answer added',
            });
    },

    updateFieldAnswer: async (request, response) => {
        const {fieldAnswerId} = request.params;

        const answers = await FieldAnswers.findOne({
            where: {
                fieldAnswerId,
            },
        });

        if (!answers) {
            return response.status(404).json({
                status: 'not found',
                message: 'answer does not exist',
            });
        }

        await answers.update(request.body, {
            fields: Object.keys(request.body),
        });

        return response.status(200).json({
            message: 'success',
            data: answers,
        });
    },
};
