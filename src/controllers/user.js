import {config} from 'dotenv';
import Models from '../models';

config();

const {
    Users,
} = Models;

export default {
    getUserById: async (request, response) => {
        const {id} = request.params;
        const user = await Users.findByPk(id);

        if(!user) {
            response.status(404).json({
                message: 'User not found.'
            })
        }

        return response.status(200).json({
            user,
        });
    },

    getUsers: async (request, response) => {
        const users = await Users.findAll();

        if(!users) {
            response.status(404).json({
                message: 'Users not found.'
            })
        }

        return response.status(200).json({
            users,
        });
    },

    createUser: async (request, response) => {
        const {firstname, lastname, email, password, role, createdAt, updateAt} = request.body;
        const {id} = request.params;

        const user = await Users.create({
            id,
            firstname,
            lastname,
            email,
            password,
            role,
            createdAt,
            updateAt,
        })
        return response.status(200).json({
            message: 'success',
            user,
        });
    },

    updateUser: async (request, response) => {
        const {id} = request.user;
        const user = await Users.findOne({
            where: {
                id,
            }
        });

        await user.update(request.body, {
            fields: Object.keys(request.body),
        });
        return response.status(200).json({
            message: 'success',
            data: user
        });
    },

    deleteUser: async (request, response) => {
        const {id} = request.params;

        const user = await Users.findOne({
            where: {
                id,
            }
        });

        if(!user) {
            response.status(406).json({
                message: 'Error on deleting.'
            })
        }

        await Users.destroy({
            where: {
                id,
            }
        });

        return response.status(200).json({
            message: 'success',
        });
    },
};
