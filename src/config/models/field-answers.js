export default (sequelize, DataTypes) => {
    const FieldAnswers = sequelize.define('FieldAnswers', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {});

    FieldAnswers.associate = (models) => {
        FieldAnswers.belongsTo(models.Components, {
            foreignKey: {
                name: 'componentId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        FieldAnswers.belongsTo(models.Fields, {
            foreignKey: {
                name: 'fieldId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return FieldAnswers;
};
