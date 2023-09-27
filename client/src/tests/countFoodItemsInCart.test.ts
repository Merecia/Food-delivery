import { describe, it, expect } from 'vitest';
import { countFoodItemsInCart } from '../utils/helper';
import { cartItems } from '../data';

describe('Counting the food items in the cart', () => {
    it('There are a few items in the cart', () => {
        expect(countFoodItemsInCart(cartItems)).toBe(11);
    });

    it('Cart is empty', () => {
        expect(countFoodItemsInCart([])).toBe(0);
    });
});