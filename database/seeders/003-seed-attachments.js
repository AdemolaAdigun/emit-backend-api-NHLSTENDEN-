import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const projectId = await queryInterface.rawSelect('Projects', { where: { name: 'Ultra-Drone-X' } }, ['id']);

        return queryInterface.bulkInsert('Attachments', [
            {
                id: uuidv4(),
                projectId,
                attachment: 'https://th.bing.com/th/id/R831650a64a0e9e2b0c7df32a6724bcc9?rik=wg0stekXuRvQ%2fA&pid=ImgRaw',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Attachments', {}),
};
