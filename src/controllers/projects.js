import {config} from 'dotenv';
import Models from '../models';
import asyncForEach from "../helpers/asyncForEach";
import {request, response} from "express";

config();

const {
    Projects,
    Users,
    Attachments,
} = Models;

export default {
    getProjectsById: async (request, response) => {
        const {id} = request.params;
        const project = await Projects.findOne({
            where: {
                id,
            },
            include: [{
                model: Users,
                attributes: ['firstname', 'firstname', 'email', 'avatar'],
                as: 'projects',
            }],
        });

        if (!project) {
            response.status(404).json({
                message: 'Project not found.'
            })
        }

        return response.status(200).json({
            message: 'success',
            data: project,
        });
    },

    getProjects: async (request, response) => {
        const projects = await Projects.findAll({
            include: [{
                model: Users,
                attributes: ['firstname', 'firstname', 'email', 'avatar'],
            },
                {
                    model: Attachments,
                }],
        });

        if (!projects) {
            response.status(404).json({
                message: 'Projects not found.'
            })
        }

        return response.status(200).json({
            message: 'success',
            data: projects,
        });
    },

    createProject: async (request, response) => {
        const {name, description} = request.body;
        const {id} = request.user.dataValues;

        const exist = await Projects.findOne({where: {name}});
        if (exist) {
            return response.status(401)
                .json({
                    status: 'error',
                    message: 'Project name exists.'
                });
        }

        const project = await Projects.create({
            userId: id,
            name,
            description,
        });



        return response.status(200).json({
            message: 'success',
            data: project,
        });
    },

    updateProject: async (request, response) => {
        const {id} = request.params;
        const project = await Projects.findOne({
            where: {
                id,
            }
        });

        if (!project) {
            return response.status(404)
                .json({
                    status: 'error',
                    message: 'Project not found.'
                })
        }

        await project.update(request.body, {
            fields: Object.keys(request.body),
        });

        return response.status(200).json({
            message: 'success',
            data: project,
        });
    },

    deleteProject: async (request, response) => {
        const {id} = request.params;
        const project = await Projects.findOne({
            where: {
                id,
            }
        });

        if (!project) {
            response.status(404).json({
                message: 'Project does not exist.'
            })
        }

        await Projects.destroy({
            where: {
                id,
            }
        });

        return response.status(200).json({
            message: 'success',
        });
    },

    addAttachment: async (request, response) => {
        if (request.files) request.body.attachment = request.files[0].secure_url;
        const { projectId } = request.params;
        const { attachment } = request.body;

        const project = await Projects.findByPk(projectId);

        if (!project) {
            return response.status(404)
                .json({
                    status: 'error',
                    message: 'Project does not exist',
                });
        }

        if (attachment) {
                await Attachments.create({
                    projectId,
                    attachment,
                });
        }

        const updatedProject = await Projects.findOne({
            where: {
                id: projectId,
            },
        });

        return response.status(200)
            .json({
                status: 'success',
                data: updatedProject,
            });
    },

    removeAttachment: async (request, response) => {
        const {attachmentId} = request.params;
        const attachmentToDestroy = await Attachments.findOne({
            where: {
                id: attachmentId,
            }
        });

        console.log(attachmentToDestroy);

        if (!attachmentToDestroy) {
            return response.status(404)
                .json({
                    status: 'error',
                    message: 'Attachment not found'
                });
        }

        await Attachments.destroy({
            where: {
                id: attachmentId,
            }
        });

        return response.status(200).json({
            status: 'success',
            message: 'Attachment deleted successfully',
        });
    },
};
