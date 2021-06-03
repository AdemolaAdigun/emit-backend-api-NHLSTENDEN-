import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

const salt = +process.env.SALT;

export default {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
        {
            id: uuidv4(),
            firstname: 'Mark',
            lastname: 'Meerlo',
            email: 'admin@emit.it',
            avatar: 'C://Users//Downloads//avatar.png',
            password: await bcrypt.hash('123456789', await bcrypt.genSalt(salt)),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete(
        'Users',
        null,
        {},
    ),
};
