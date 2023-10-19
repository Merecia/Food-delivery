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
                foodId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },            
                amount: { type: Number, default: 1 },
                totalCost: { type: Number, required: true, }
            }
        ],
        totalCost: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'pending' }
    },
    { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);