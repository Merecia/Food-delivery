import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (request, response) => {
    const encryptedPassword = CryptoJS.AES.encrypt(
        request.body.password,
        process.env.PASSWORD_SECRET
    ).toString();

    const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: encryptedPassword
    });

    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json(error);
    }
};

export const login = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });

        if (!user) {
            return response.status(401).json("Wrong credentials");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== request.body.password) {
            return response.status(401).json('Wrong credentials');
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        const { password, ...userInfo } = user._doc;
        response.status(200).json({ ...userInfo, accessToken });
    } catch (error) {
        response.status(500).json(error);
    }
};