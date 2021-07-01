import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Templates', [
            {
                id: uuidv4(),
                name: 'Resistor',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Templates', {}),
};
