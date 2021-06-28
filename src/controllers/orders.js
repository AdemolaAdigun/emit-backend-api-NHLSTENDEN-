import {config} from 'dotenv';
import Models from '../models';

config();

const {
    Orders,
    Users,
    Components,
} = Models;

export default {
    getOrderById: async (request, response) => {
        if (request.role !== 'admin') {
            return response.status(403)
                .json({
                    status: 'error',
                    message: 'You are not permitted.',
                });
        }
        const {id} = request.params;
        const order = await Orders.findOne({
            where: {
                id,
            },
            include: [{
                model: Users,
                attributes: ['firstname', 'firstname', 'email', 'avatar'],
                as: 'buyer',
            }, {
                model: Components,
                attributes: ['name', 'count'],
                as: 'component',
            }],
        });

        if (!order) {
            return response.status(404).json({
                message: 'Order not found.'
            })
        }

        return response.status(200).json({
            message: 'success',
            data: order,
        });
    },

    getOrders: async (request, response) => {
        if (request.role !== 'admin') {
            return response.status(403)
                .json({
                    status: 'error',
                    message: 'You are not permitted.',
                });
        }
        const orders = await Orders.findAll({
            include: [{
                model: Users,
                attributes: ['firstname', 'firstname', 'email', 'avatar'],
                as: 'buyer',
            }, {
                model: Components,
                attributes: ['name', 'count'],
                as: 'component',
            }],
        });

        if (!orders) {
            response.status(404).json({
                message: 'Orders not found.'
            })
        }

        return response.status(200).json({
            status: 'success',
            data: orders,
        });
    },

    /*
    createOrder: async (request, response) => {
        const {count, transactionCost} = request.body;
        const {id} = request.user;

        const orders = await Orders.create({
            componentId:
            userId: id,
            count,
            transactionCost,
        });
        return response.status(200).json({
            message: 'success',
            orders,
        });
    },
     */

    deleteOrder: async (request, response) => {
        if (request.role !== 'admin') {
            return response.status(403)
                .json({
                    status: 'error',
                    message: 'You are not permitted.',
                });
        }
        if (request.role !== 'admin') {
            return response.status(403)
                .json({
                    status: 'error',
                    message: 'You are not permitted.',
                });
        }
        const {id} = request.params;
        const order = await Orders.findOne({
            where: {
                id,
            }
        });

        if (!order) {
            response.status(406).json({
                message: 'Error on deleting.'
            })
        }

        await Orders.destroy({
            where: {
                id,
            }
        });

        return response.status(200).json({
            status: 'success',
            message: 'Order deleted successfully',
        });
    },
};
