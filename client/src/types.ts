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
};

export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUser {
    _id: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    accessToken: string;
}