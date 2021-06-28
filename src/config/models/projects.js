export default (sequelize, DataTypes) => {
    const Projects = sequelize.define('Projects', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {});

    Projects.associate = (models) => {
        Projects.belongsTo(models.Users, {
            foreignKey: {
                name: 'userId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Projects.hasMany(models.Attachments, {
            foreignKey: {
                name: 'projectId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Projects.belongsToMany(models.Components, {
            through: models.ProjectComponents,
            foreignKey: {
                name: 'projectId',
            },
            otherKey: {
                name: 'componentId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Projects;
};
