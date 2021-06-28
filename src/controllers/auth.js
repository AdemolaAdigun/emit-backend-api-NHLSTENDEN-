import {config} from 'dotenv';
import {generateAuthToken} from '../helpers/auth';
import Models from '../models';

config();

const {

    User,

} = Models;


export default {
    loginUser: async (request, response) => {
        const {
            email,
            password,
        } = request.body;

        const userEmail = await User.getExistingUser(email);
        if (!userEmail) {
            return response.status(401)
                .json({
                    status: 'error',
                    message: 'Email or password is incorrect',
                });
        }

        const isPassword = userEmail.validatePassword(password);
        if (!isPassword) {
            return response.status(401)
                .json({
                    status: 'error',
                    message: 'Email or password is incorrect',
                });
        }

        const user = userEmail.getSafeDataValues();
        const token = generateAuthToken(user);

        return response.status(200)
            .json({
                status: 'success',
                data: {
                    user,
                    token,
                },
            });
    },

    whoAmI: async (request, response) => {
        const { id } = request.user;
        const user = await Users.findOne({
            where: {
                id,
            }
        });
        console.log(user);
        const { role } = await user.dataValues;
        return response.status(200)
            .json({
                status: 'success',
                data: role,
            });
    },
}
