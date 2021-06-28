import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

/**
 * @function generateAuthToken
 * @description generates token for user or vendor
 *
 * @param {Object} user - token payload
 *
 * @returns {String} token
 */
export const generateAuthToken = ({ id }) => jwt.sign(
  { id },
  process.env.JWT_KEY,
  { expiresIn: '24h' },
);

export default { generateAuthToken };
