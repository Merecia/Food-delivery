import Food from '../models/Food.js';

export const create = async (request, response) => {
    try {
        const food = new Food(request.body);
        const savedFood = await food.save();
        response.status(200).json(savedFood);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const update = async (request, response) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }
        );
        response.status(200).json(updatedFood);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const remove = async (request, response) => {
    try {
        await Food.findByIdAndDelete(request.params.id);
        response.status(200).json('Еда была удалена');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getById = async (request, response) => {
    try {
        const food = await Food.findById(request.params.id);
        response.status(200).json(food);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getByCategory = async (request, response) => {
    try {
        const categoryId = request.params.id;
        const food = await Food.find({ categoryId });
        response.status(200).json(food);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAll = async (request, response) => {
    try {
        const query = request.query.query;

        let food;
        if (query) {
            food = await Food.find({
                $or: [
                    { 'name': new RegExp(query, 'i') },
                    { 'description': new RegExp(query, 'i') }
                ]
            });
        } else {
            food = await Food.find();
        }

        response.status(200).json(food);
    } catch (error) {
        response.status(500).json(error);
    }
}