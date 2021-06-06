export default (sequelize, DataTypes) => {
    const Fields = sequelize.define('Fields', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        fieldName: {
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

    Fields.associate = (models) => {
        Fields.belongsTo(models.Templates, {
            foreignKey: {
                name: 'templateId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Fields.hasMany(models.FieldAnswers, {
            foreignKey: {
                name: 'fieldId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Fields;
};
