import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const projectId = await queryInterface.rawSelect('Projects',
            { where: { name: 'Ultra-Drone-X' } },
            ['id']);
        const componentId = await queryInterface.rawSelect('Components',
            { where: { name: 'TE Connectivity 330Ω Carbon Film Resistor 0.33W ±5% CFR25J330R' } },
            ['id']);

        return queryInterface.bulkInsert('ProjectComponents', [
            {
                projectId,
                componentId,
                count: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ProjectComponents', {}),
};
