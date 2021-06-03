import {config} from 'dotenv';
import Models from '../models';

config();

const {
    Users,
} = Models;

export default {

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
        const {id} = request.params;
        const users = await Users.findOne({
            where: {
                id,
            }
        });

        await users.update(request.body, {
            fields: Object.keys(request.body),
        });
        return response.status(200).json({
            message: 'success',
        });
    },



        return response.status(200).json({
            message: 'success',
        });
    },
};