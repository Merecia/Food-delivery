import pizza from './assets/images/pizza.svg';
import asian from './assets/images/asian.svg';
import burger from './assets/images/burger.svg';
import mexican from './assets/images/mexican.svg';
import donat from './assets/images/donat.svg';
import { ICartItem, ICategory, IFood } from './types';

export const categories: ICategory[] = [
    { id: '1', name: 'Пицца', imageURL: pizza },
    { id: '2', name: 'Суши', imageURL: asian },
    { id: '3', name: 'Бургеры', imageURL: burger },
    { id: '4', name: 'Хот-доги', imageURL: mexican },
    { id: '5', name: 'Пончики', imageURL: donat }
];

export const foodList:  IFood[] = [
    { 
        id: '1', 
        imageURL: 'https://cheese-cake.ru/DesertImg/ponchiki-assorti-0-1-1.jpg', 
        name: 'Маргарита', 
        weight: 20, 
        price: 150,
        description: 'Это пончик' 
    },
    { 
        id: '2', 
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/77/00409_paczki_z_serem%2C_sanok.jpg', 
        name: 'Суши', 
        weight: 50, 
        price: 200,
        description: 'Сырая рыба' 
    },
    { 
        id: '3', 
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/77/00409_paczki_z_serem%2C_sanok.jpg', 
        name: 'Суши', 
        weight: 50, 
        price: 200,
        description: 'Сырая рыба' 
    },
    { 
        id: '4', 
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/77/00409_paczki_z_serem%2C_sanok.jpg', 
        name: 'Суши', 
        weight: 50, 
        price: 200,
        description: 'Сырая рыба'  
    }
];  

export const cartItems: ICartItem[] = [
    { foodItem: foodList[0], amount: 2 },
    { foodItem: foodList[1], amount: 3 },
    { foodItem: foodList[2], amount: 5 },
    { foodItem: foodList[3], amount: 1 }
];