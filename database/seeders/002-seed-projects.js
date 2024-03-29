import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const userId = await queryInterface.rawSelect('Users', { where: { firstname: 'Mark' } }, ['id']);

        return queryInterface.bulkInsert('Projects', [
            {
                id: uuidv4(),
                userId,
                name: 'Ultra-Drone-X',
                description: 'While drones serve a variety of purposes, such as recreational, photography, commercial.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Projects', {}),
};
