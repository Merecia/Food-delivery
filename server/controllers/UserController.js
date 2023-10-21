import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

export const update = async (request, response) => {
    try {
        const password = request.body.password;

        if (password) {
            request.body.password = CryptoJS.AES.encrypt(
                password, process.env.PASSWORD_SECRET
            ).toString();
        }

        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }
        );

        response.status(200).json(updatedUser);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const remove = async (request, response) => {
    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(200).json('Пользователь удалён');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getById = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const { password, ...userInfo } = user._doc;
        response.status(200).json(userInfo);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAll = async (request, response) => {
    try {
        const newUsers = request.query.new;

        let users = [];

        if (newUsers) {
            const NEW_USERS_LIMIT = process.env.NEW_USERS_LIMIT || 5;
            users = await User.find().sort({ createdAt: -1 }).limit(NEW_USERS_LIMIT);
        } else {
            users = await User.find();
        }

        response.status(200).json(users);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getStatsForYear = async (request, response) => {
    try {
        const year = request.params.year;

        const beginningOfYear = new Date(
            Number(year), 0, 2
        );

        const beginningOfNextYear = new Date(
            Number(year) + 1, 0, 2
        );

        const stats = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: beginningOfYear,
                        $lt: beginningOfNextYear
                    }
                }
            },
            {
                $project: {
                    year: { $year: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: '$year',
                    total: { $sum: 1 }
                }
            }
        ]);

        return response.status(200).send(stats);
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getStatsForMonth = async (request, response) => {
    try {
        const month = request.params.month;

        const currentYear = new Date().getFullYear();

        const beginningOfMonth = new Date(
            currentYear, Number(month) - 1, 2
        );

        const beginningOfNextMonth = new Date(
            currentYear, Number(month), 2
        );

        const stats = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: beginningOfMonth,
                        $lt: beginningOfNextMonth
                    }
                }
            },
            {
                $project: {
                    month: { $month: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);

        return response.status(200).send(stats);
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getStatsForDayOfMonth = async (request, response) => {
    try {
        const dayOfMonth = request.params.dayOfMonth;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const beginningOfDay = new Date(
            currentYear, currentMonth, Number(dayOfMonth)
        );

        const beginningOfNextDay = new Date(
            currentYear, currentMonth, Number(dayOfMonth) + 1
        );

        const stats = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: beginningOfDay,
                        $lt: beginningOfNextDay
                    }
                }
            },
            {
                $project: {
                    dayOfMonth: { $dayOfMonth: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: '$dayOfMonth',
                    total: { $sum: 1 }
                }
            }
        ]);

        return response.status(200).send(stats);
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getGeneralStats = async (request, response) => {
    try {
        const amount = await User.countDocuments({});
        const stats = { _id: new Date(), total: amount };
        return response.status(200).send(stats);
    } catch (error) {
        return response.status(500).json(error);
    }
}