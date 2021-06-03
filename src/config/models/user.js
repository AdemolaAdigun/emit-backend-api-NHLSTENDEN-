import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
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

    Users.associate = (models) => {
        Users.hasMany(models.Projects, {
            foreignKey: { name: 'userId' },
            as: 'projects',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        });
        Users.hasMany(models.Components, {
            foreignKey: { name: 'userId' },
            as: 'author',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        });
        Users.hasMany(models.Orders, {
            foreignKey: { name: 'userId' },
            as: 'buyer',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        });
    };

    Users.beforeCreate(async (user) => {
        user.password = await user.generatePasswordHash();
    });

    Users.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            user.password = await user.generatePasswordHash();
        }
    });

    Users.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    Users.prototype.generatePasswordHash = async function generatePasswordHash() {
        const saltRounds = +process.env.SALT;
        return bcrypt.hash(this.password, saltRounds);
    };

    Users.prototype.generateVerificationToken = async function generateVerificationToken() {
        const secret = `${this.password}!${this.createdAt.toISOString()}`;
        return jwt.sign({ id: this.id }, secret, { expiresIn: '4000m' });
    };

    Users.prototype.decodeVerificationToken = async function decodeVerificationToken(token) {
        const secret = `${this.password}!${this.createdAt.toISOString()}`;
        return jwt.verify(token, secret);
    };

    Users.prototype.getSafeDataValues = function getSafeDataValues() {
        const {
            password,
            ...data
        } = this.dataValues;
        return data;
    };

    Users.prototype.validatePassword = function validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    };

    Users.getExistingUsers = async (queryString, column = 'email') => {
        const user = await Users.findOne({
            where: { [column]: queryString },
        });
        return user;
    };

    return Users;
};
