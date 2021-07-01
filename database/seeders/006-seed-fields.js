import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const templateId = await queryInterface.rawSelect('Templates', { where: { name: 'Resistor' } }, ['id']);

        return queryInterface.bulkInsert('Fields', [
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Resistance',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Power Rating',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Tolerance',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Technology',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Series',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Minimum Operating Temperature',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                templateId,
                fieldName: 'Maximum Operating Temperature',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Fields', {}),
};
