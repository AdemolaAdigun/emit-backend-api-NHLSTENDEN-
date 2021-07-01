import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const templateId = await queryInterface.rawSelect('Templates', { where: { name: 'Resistor' } }, ['id']);
        const userId = await queryInterface.rawSelect('Users', { where: { firstname: 'Mark' } }, ['id']);

        return queryInterface.bulkInsert('Components', [
            {
                id: uuidv4(),
                userId,
                templateId,
                name: 'TE Connectivity 330Ω Carbon Film Resistor 0.33W ±5% CFR25J330R',
                count: 190,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Components', {}),
};
