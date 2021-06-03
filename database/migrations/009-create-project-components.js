export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProjectComponents', {
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
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('ProjectComponents'),
};
