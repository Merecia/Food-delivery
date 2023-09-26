import { describe, it, expect } from 'vitest';
import { countFoodItemsCost } from '../utils/helper';
import { cartItems } from '../data';

describe('Counting cost of the food items in the cost', () => {
    it('There are a few items in the cart', () => {
        expect(countFoodItemsCost(cartItems)).toBe(2100);
    });

    it('Cart is empty', () => {
        expect(countFoodItemsCost([])).toBe(0);
    });
});