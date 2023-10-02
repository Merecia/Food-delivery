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
        console.log(error);
        response.status(500).json(error);
    }
}

export const remove = async (request, response) => {
    try {
        await Food.findByIdAndDelete(request.params.id);
        response.status(200).json('Food has been deleted');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getById = async (request, response) => {
    try {
        console.log(request.params.id);
        const food = await Food.findById(request.params.id);
        response.status(200).json(food);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getByCategory = async (request, response) => {
    try {
        const category = request.params.category;
        const food = await Food.find({ category });
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