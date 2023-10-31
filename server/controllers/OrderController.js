import Order from '../models/Order.js';

export const create = async (request, response) => {
    try {
        const order = new Order(request.body);
        const savedOrder = await order.save();
        response.status(200).json(savedOrder);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const update = async (request, response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }
        );
        response.status(200).json(updatedOrder);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const remove = async (request, response) => {
    try {
        await Order.findByIdAndDelete(request.params.id);
        response.status(200).json('Заказ был удалён');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getOrdersOfUser = async (request, response) => {
    try {
        const userId = request.params.id;
        const orders = await Order.find({ userId });
        response.status(200).json(orders);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const order = await Order.findById(id);
        response.status(200).json(order);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAll = async (request, response) => {
    try {
        const orders = await Order.find();
        response.status(200).json(orders);
    } catch (error) {
        response.status(500).json(error);
    }
}