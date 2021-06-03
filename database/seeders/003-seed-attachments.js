import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const projectId = await queryInterface.rawSelect('Projects', { where: { name: 'Project-X' } }, ['id']);

        return queryInterface.bulkInsert('Attachments', [
            {
                id: uuidv4(),
                projectId,
                attachment: '/attachments',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Attachments', {}),
};
