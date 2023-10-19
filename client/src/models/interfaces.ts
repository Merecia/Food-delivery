export interface ICategory {
    _id: string;
    name: string;
    imageURL: string;
};

export interface IFood {
    _id: string;
    imagesURL: string[];
    categoryId: string;
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

export interface IPersonalData {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface IFetchError {
    message: string;
}

export interface IAutocompleteOption {
    _id: string;
    name: string;
}

export interface IPaymentData {
    amount: number;
    billing_details: IBillingDetails;
}

export interface IBillingDetails {
    name: string;
    address: IAddress;
}

export interface IAddress {
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postal_code?: string;
    state?: string;
}

export interface IOrderedFood {
    foodId: string;
    name: string;
    price: number;
    amount: number;
    totalCost: number;
}

export interface IOrder {
    _id?: string;
    userId: string;
    orderedFood: IOrderedFood[];
    totalCost: number;
    address: IAddress;
    createdAt?: string;
    status?: string;
}