export default (sequelize, DataTypes) => {
    const Components = sequelize.define('Components', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: DataTypes.STRING,
        count: {
            type: DataTypes.INTEGER,
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

    Components.associate = (models) => {
        Components.belongsToMany(models.Projects, {
            through: models.ProjectComponents,
            foreignKey: {
                name: 'componentId',
            },
            otherKey: {
                name: 'projectId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Components.hasOne(models.Orders, {
            foreignKey: {
                name: 'componentId',
            },
            as: 'component',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Components.belongsTo(models.Users, {
            foreignKey: {
                name: 'userId',
            },
            as: 'author',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Components.belongsTo(models.Templates, {
            foreignKey: {
                name: 'templateId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Components.hasMany(models.FieldAnswers, {
            foreignKey: {
                name: 'componentId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Components;
};
