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
