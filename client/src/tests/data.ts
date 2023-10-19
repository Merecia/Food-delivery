import pizza from './assets/images/pizza.svg';
import asian from './assets/images/asian.svg';
import burger from './assets/images/burger.svg';
import mexican from './assets/images/mexican.svg';
import donat from './assets/images/donat.svg';
import { ICartItem, ICategory, IFood } from '../models/interfaces';

export const categories: ICategory[] = [
    { _id: '1', name: 'Пицца', imageURL: pizza },
    { _id: '2', name: 'Суши', imageURL: asian },
    { _id: '3', name: 'Бургеры', imageURL: burger },
    { _id: '4', name: 'Хот-доги', imageURL: mexican },
    { _id: '5', name: 'Пончики', imageURL: donat }
];

export const foodList: IFood[] = [
    {
        _id: '1',
        imagesURL: [
            'https://cheese-cake.ru/DesertImg/ponchiki-assorti-0-1-1.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/7/77/00409_paczki_z_serem%2C_sanok.jpg'
        ],
        name: 'Пончик',
        categoryId: '5',
        weight: 20,
        price: 150,
        description: 'Это пончик',
        inStock: true
    },
    {
        _id: '2',
        imagesURL: [
            'https://e2.edimdoma.ru/data/posts/0001/6493/16493-ed4_wide.jpg?1631186249',
            'https://static.1000.menu/img/content-v2/02/1d/53551/xot-dog-v-domashnix-usloviyax-v-bulochke-s-sosiskoi_1616347265_21_max.jpg'
        ],
        categoryId: '4',
        name: 'Хот-доги',
        weight: 50,
        price: 200,
        description: 'Это хот-дог',
        inStock: true
    },
    {
        _id: '3',
        imagesURL: [
            'https://cdn.tokyo-city.ru//goods/sake_sushi_13062022.jpg'
        ],
        categoryId: '2',
        name: 'Суши',
        weight: 70,
        price: 250,
        description: 'Тут суши',
        inStock: true
    },
    {
        _id: '4',
        imagesURL: [
            'https://restoran-karamba.ru/wp-content/uploads/burgery.jpg',
            'https://www.gastronom.ru/binfiles/images/20160203/b267a543.jpg',
            'https://www.sterevan.ru/images/catalog/3fa4080579377c5e94c125fd0b124106.jpg'
        ],
        categoryId: '3',
        name: 'Бигмак',
        weight: 100,
        price: 300,
        description: 'Доставка прямо из McDonalds',
        inStock: true
    }
];

export const cartItems: ICartItem[] = [
    { foodItem: foodList[0], amount: 2 },
    { foodItem: foodList[1], amount: 3 },
    { foodItem: foodList[2], amount: 5 },
    { foodItem: foodList[3], amount: 1 }
];