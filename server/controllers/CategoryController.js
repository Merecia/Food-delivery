import Category from '../models/Category.js';

export const create = async (request, response) => {
    try {
        const category = new Category(request.body);
        const savedCategory = await category.save();
        response.status(200).json(savedCategory);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const update = async (request, response) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            request.params.id, 
            { $set: request.body }, 
            { new: true }
        );
        response.status(200).json(updatedCategory);
    } catch(error) {
        response.status(500).json(error);
    }
}

export const remove = async (request, response) => {
    try {
        await Category.findByIdAndDelete(request.params.id);
        response.status(200).json('Категория была удалена');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getById = async (request, response) => {
    try {
        const category = await Category.findById(request.params.id);
        response.status(200).json(category);
    } catch(error) {
        response.status(500).json(error);
    }
}

export const getAll = async (request, response) => {
    try {
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.status(500).json(error);
    }
}