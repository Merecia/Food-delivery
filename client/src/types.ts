export interface ICategory {
    id: string;
    name: string;
    imageURL: string;
};

export interface IFood {
    id: string, 
    imagesURL: string[], 
    name: string, 
    description: string,
    weight: number, 
    price: number
};

export interface ICartItem {
    foodItem: IFood;
    amount: number;
}