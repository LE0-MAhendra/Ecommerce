import { RootState } from "@/redux/store";
import { OrderProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllOrders: [] as OrderProps[],
  isLoading: true,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.AllOrders = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setOrders, setOrderLoading } = orderSlice.actions;

export const selOrders = (state: RootState) => state.orders.AllOrders;

export default orderSlice.reducer;
export const ordLoading = (state: RootState) => state.orders.isLoading;
