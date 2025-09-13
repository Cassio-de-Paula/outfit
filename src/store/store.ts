import { configureStore } from "@reduxjs/toolkit";
import breadcrumbReducer from './slices/breadcrumbSlice'
import shoppingCartReducer from './slices/shoppingCartSlice'
import screenModeReducer from './slices/darkModeSlice'

export const store = configureStore({
    reducer: {
        breadcrumbs: breadcrumbReducer,
        shoppingCart: shoppingCartReducer,
        screenMode: screenModeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
