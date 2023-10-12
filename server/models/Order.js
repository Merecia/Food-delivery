import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        foodList: [
            {
                foodItemId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        totalCost: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'pending' }
    },
    { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);