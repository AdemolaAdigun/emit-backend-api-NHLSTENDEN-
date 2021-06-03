import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const userId = await queryInterface.rawSelect('Users', { where: { firstname: 'Mark' } }, ['id']);

        return queryInterface.bulkInsert('Projects', [
            {
                id: uuidv4(),
                userId,
                name: 'Project-X',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                    'Sed eleifend dignissim tempor. Vestibulum sed eros.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Projects', {}),
};
