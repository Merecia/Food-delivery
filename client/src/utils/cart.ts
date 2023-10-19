import { ICartItem, IFood } from '../models/interfaces';

export const findCartItemIndex = (foodItem: IFood, cart: ICartItem[]) => {
    const cartItemIndex = cart.findIndex(
        (cartItem) => cartItem.foodItem._id === foodItem._id
    );

    if (cartItemIndex === -1) {
        return undefined;
    } else {
        return cartItemIndex;
    }
}

export const countFoodItemsInCart = (cart: ICartItem[]) => {
    let foodItemsAmount = 0;

    for (const cartItem of cart) {
        foodItemsAmount += cartItem.amount;
    }

    return foodItemsAmount;
}

export const countFoodItemsCost = (cart: ICartItem[]) => {
    let cost = 0;

    for (const cartItem of cart) {
        cost += cartItem.amount * cartItem.foodItem.price;
    }

    return cost;
}