import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import asyncWrapper from './asyncWrapper';
import Models from '../models';

config();

const {
  Users,
} = Models;

export default {
  /**
   * @param {Object} request express request object
   * @param {Object} response express response object
   * @param {Function} next callback to call next middleware
   *
   * @returns {Object} response from the server
   */
  verifyToken: asyncWrapper(
    async (request, response, next) => {
      const { JWT_KEY } = process.env;
      const authHeader = request.headers.authorization || request.headers['x-access-token'];

      if (!authHeader) {
        return response.status(401)
            .json({
                status: 'error',
                message: 'No token found!'
            });
      }

      let token;

      if (authHeader.startsWith('Bearer ')) {
        [, token] = authHeader.split(' ');
      } else {
        token = authHeader;
      }
      const decoded = await promisify(jwt.verify)(token, JWT_KEY);

      const currentUsers = await Users.findByPk(decoded.id);

      if (currentUsers) {
        request.user = currentUsers;
        request.role = currentUsers.dataValues.role;
      } else {
        return response.status(401)
          .json({
            status: 'error',
            message: 'Invalid Token',
          });
      }
      return next();
    },
  ),

  /**
   * @description checks if user is an admin
   *
   * @param {Object} request express request object
   * @param {Object} response express response object
   * @param {Function} callback to next middleware
   *
   * @returns {Object}
   */
  isAdmin: (request, response, next) => {
    const { isAdmin } = request.user;
    if (!isAdmin) {
        return response.status(401)
            .json({
                status: 'error',
                message: 'You are not an Admin',
            });
    }
    next();
  },
};
