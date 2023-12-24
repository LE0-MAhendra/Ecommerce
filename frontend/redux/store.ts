import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from "./features/Auth/authSlice";
import productSlice from "./features/Items/productSlice";
import BrandSlice from "./features/Items/BrandSlice";
import categorySlice from "./features/Items/categorySlice";
import cartSlice from "./features/Carts/cartSlice";
import OrderSlice from "./features/Orders/OrderSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    products: productSlice,
    brands: BrandSlice,
    categories: categorySlice,
    cart: cartSlice,
    orders: OrderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<(typeof store)["getState"]>;
export type AppDispatch = (typeof store)["dispatch"];
