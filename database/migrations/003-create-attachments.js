export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Attachments', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
            },
            projectId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Projects',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            attachment: {
                type: Sequelize.STRING,
                allowNull: false,
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('Attachments'),
};
