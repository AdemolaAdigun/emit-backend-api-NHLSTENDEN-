import { v4 as uuidv4 } from 'uuid';

export default {
    up: async (queryInterface, Sequelize) => {
        const componentId = await queryInterface.rawSelect('Components',
            { where: { name: 'TE Connectivity 330Ω Carbon Film Resistor 0.33W ±5% CFR25J330R' } }, ['id']);
        const fieldId01 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Resistance' } }, ['id']);
        const fieldId02 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Power Rating' } }, ['id']);
        const fieldId03 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Tolerance' } }, ['id']);
        const fieldId04 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Technology' } }, ['id']);
        const fieldId05 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Series' } }, ['id']);
        const fieldId06 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Minimum Operating Temperature' } }, ['id']);
        const fieldId07 = await queryInterface.rawSelect('Fields',
            { where: { fieldName: 'Maximum Operating Temperature' } }, ['id']);

        return queryInterface.bulkInsert('FieldAnswers', [
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId01,
                answer: '330Ω',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId02,
                answer: '0.33W',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId03,
                answer: '±5%',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId04,
                answer: 'Carbon Film',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId05,
                answer: 'CFR25',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId06,
                answer: '-55°C',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                componentId,
                fieldId: fieldId07,
                answer: '+155°C',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FieldAnswers', {}),
};
