import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true },
        weight: { type: Number, required: true },
        categoryId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        imagesURL: { 
            type: Array,
            validate: {
                validator: (array) => array.length >= 1,
                message: 'Food item must have at least one image'
            },
            required: true
        },
    }, 
    { timestamps: true }
);

export default mongoose.model('Food', FoodSchema);