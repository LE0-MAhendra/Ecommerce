import { createSlice } from "@reduxjs/toolkit";
import { CartProps } from "@/types/types";
import { RootState } from "@/redux/store";

interface CartState {
  AllCartItems: CartProps[];
  totalQuantity: number;
  totalProducts: number;
  isLoading: boolean;
}

const initialState: CartState = {
  AllCartItems: [],
  totalQuantity: 0,
  totalProducts: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.AllCartItems = action.payload;
      state.totalProducts = state.AllCartItems.length;
    },
    DelProd: (state, action) => {
      const prodIdToDelete = action.payload;
      state.AllCartItems = state.AllCartItems.filter(
        (item) => item.id !== prodIdToDelete
      );
      state.totalProducts = state.AllCartItems.length;
    },
    DeleteAll: (state) => {
      return initialState;
    },
    finishedLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addProduct, DeleteAll, DelProd, finishedLoading } =
  cartSlice.actions;
export const TotalProdCart = (state: RootState) => state.cart.AllCartItems;
export const NumProd = (state: RootState) => state.cart.totalProducts;
export default cartSlice.reducer;
