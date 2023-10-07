export interface ICategory {
    _id: string;
    name: string;
    imageURL: string;
};

export interface IFood {
    _id: string; 
    imagesURL: string[];
    category: string;
    name: string;
    description: string;
    weight: number;
    price: number;
    inStock: boolean;
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

export interface FetchError {
    message: string;
}

export interface IAutocompleteOption {
    _id: string;
    name: string;
}