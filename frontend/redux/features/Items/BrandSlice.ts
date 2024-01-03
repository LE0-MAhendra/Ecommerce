import { RootState } from "@/redux/store";
import { BrandProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  AllBrands: [] as BrandProps[],
  selectedProduct: null,
};
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.AllBrands = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setBrandLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setBrands, setSelectedBrand, setBrandLoading } =
  brandSlice.actions;
export const selBrands = (state: RootState) => state.brands.AllBrands;
export default brandSlice.reducer;
export const brandLoading = (state: RootState) => state.brands.isLoading;
