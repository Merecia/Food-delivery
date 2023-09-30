import { ICartItem, IFood, IRegistrationData } from "../types";

export const amountFormatting = (amount: number): string => {
    let formattedAmount = String(amount);

    if (String(amount).length === 1) {
        formattedAmount = '0' + String(amount);
    }

    return formattedAmount;
}

export const findCartItemIndex = (foodItem: IFood, cart: ICartItem[]) => {
    const cartItemIndex = cart.findIndex(
        (cartItem) => cartItem.foodItem.id === foodItem.id
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

export const isRegistrationData = (data: any): data is IRegistrationData => {
    return (
        'firstName' in data && 
        'lastName' in data && 
        'email' in data && 
        'password' in data
    );
}