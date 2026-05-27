import { configureStore } from '@reduxjs/toolkit'
import productsApi from './features/products/productsApi';

import cartReducer from './features/cart/cartSlice';
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice"
import reviewApi from './features/reviews/reviewsApi';

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware),
});