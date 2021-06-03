export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('FieldAnswers', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
            },
            fieldId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Fields',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            componentId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Components',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            answer: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: '-',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: (queryInterface, Sequelize) => queryInterface.dropTable('FieldAnswers'),
};
