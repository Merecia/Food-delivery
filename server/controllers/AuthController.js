import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;

        const userWithThisEmail = await User.findOne({ email });

        if (userWithThisEmail) {
            return response.status(401).json({ 
                message: 'User with this email is already registered' 
            });
        }

        const encryptedPassword = CryptoJS.AES.encrypt(
            password, process.env.PASSWORD_SECRET
        ).toString();

        const user = new User({
            firstName, lastName,
            email, password: encryptedPassword
        });

        const savedUser = await user.save();

        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        const { password: userPassword, ...userData } = savedUser._doc;
        response.status(201).json({ ...userData, accessToken });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Failed to register' });
    }
};

export const login = async (request, response) => {
    try {
        const { password, email } = request.body;
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(401).json({ message: 'Wrong credentials' });
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, process.env.PASSWORD_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return response.status(401).json({ message: 'Wrong credentials' });
        }

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        const { password: userPassword, ...userData } = user._doc;
        response.status(200).json({ ...userData, accessToken });
    } catch (error) {
        console.log(error);
        response.status(500).json({ mesage: 'Failed to login' });
    }
};