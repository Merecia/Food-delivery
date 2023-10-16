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
import {
    cartReducer,
    authReducer,
    foodReducer,
    searchReducer,
    categoriesReducer,
    foodDetailsReducer,
    paymentReducer,
    orderReducer,
    personalAccountReducer
} from './slices/index.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
    order: orderReducer,
    personalAccount: personalAccountReducer
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