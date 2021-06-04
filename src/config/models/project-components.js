export default (sequelize, DataTypes) => {
    const ProjectComponents = sequelize.define('ProjectComponents', {
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

    ProjectComponents.associate = (models) => {
    };
    return ProjectComponents;
};
