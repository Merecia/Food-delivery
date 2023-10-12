import Order from '../models/Order.js';

export const create = async (request, response) => {
    try {
        const order = new Order(request.body);
        const savedOrder = await order.save();
        response.status(200).json({ orderId: savedOrder._id });
    } catch (error) {
        response.status(500).json(error);
    }
}