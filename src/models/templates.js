export default (sequelize, DataTypes) => {
    const Templates = sequelize.define('Templates', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {});

    Templates.associate = (models) => {
        Templates.hasMany(models.Components, {
            foreignKey: {
                name: 'templateId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Templates.hasMany(models.Fields, {
            foreignKey: {
                name: 'templateId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Templates;
};
