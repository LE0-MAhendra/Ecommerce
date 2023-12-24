import { RootState } from "@/redux/store";
import { OrderProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllOrders: [] as OrderProps[],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.AllOrders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;

export const selOrders = (state: RootState) => state.orders.AllOrders;

export default orderSlice.reducer;
