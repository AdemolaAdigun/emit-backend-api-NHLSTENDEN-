import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const componentId = await queryInterface.rawSelect('Components',
            { where: { name: 'TE Connectivity 330Ω Carbon Film Resistor 0.33W ±5% CFR25J330R' } },
            ['id']);
        const userId = await queryInterface.rawSelect('Users', { where: { firstname: 'Mark' } },
            ['id']);

        return queryInterface.bulkInsert('Orders', [
            {
                id: uuidv4(),
                userId,
                componentId,
                transactionCost: 299.99,
                count: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', {}),
};
