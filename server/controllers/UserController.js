import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const update = async (request, response) => {
    try {
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
        response.status(200).json('User has been deleted');
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

export const getStats = async (request, response) => {
    try {
        const year = request.query.year;
        const month = request.query.month;
        const dayOfMonth = request.query.dayOfMonth;

        let stats;

        if (year) stats = await getStatsForYear(year);
        else if (month) stats = await getStatsForMonth(month);
        else if (dayOfMonth) stats = await getStatsForDayOfMonth(dayOfMonth);
        else stats = await getAggregateStats();

        response.status(200).send(stats);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}

const getStatsForYear = async (year) => {
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

    return stats;
}

const getStatsForMonth = async (month) => {
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

    return stats;
}

const getStatsForDayOfMonth = async (dayOfMonth) => {
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

    return stats;
}

const getAggregateStats = async () => {
    const amount = await User.countDocuments({});

    return {
        _id: new Date(),
        total: amount
    };
}