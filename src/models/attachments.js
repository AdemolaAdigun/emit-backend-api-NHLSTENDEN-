export default (sequelize, DataTypes) => {
    const Attachments = sequelize.define('Attachments', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        attachment: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {});

    Attachments.associate = (models) => {
        Attachments.belongsTo(models.Projects, {
            foreignKey: {
                name: 'projectId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Attachments;
};
