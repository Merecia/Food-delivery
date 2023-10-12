import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import foodDetailsReducer from './foodDetailsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import foodReducer from './foodSlice';
import categoriesReducer from './categoriesSlice';
import searchReducer from './searchSlice';
import paymentReducer from './paymentSlice';
import orderReducer from './orderSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({ 
    cart: cartReducer,
    auth: authReducer,
    food: foodReducer,
    search: searchReducer,
    categories: categoriesReducer,
    foodDetails: foodDetailsReducer,
    payment: paymentReducer,
    order: orderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, 
                    REHYDRATE, 
                    PAUSE, 
                    PERSIST, 
                    PURGE, 
                    REGISTER
                ]
            }
        })
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);