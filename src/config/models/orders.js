export default (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
        },
        transactionCost: {
            type: DataTypes.FLOAT,
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

    Orders.associate = (models) => {
        Orders.belongsTo(models.Components, {
            foreignKey: {
                name: 'componentId',
            },
            as: 'component',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Orders.belongsTo(models.Users, {
            foreignKey: {
                name: 'userId',
            },
            as: 'buyer',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Orders;
};
