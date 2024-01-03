import { RootState } from "@/redux/store";
import { CategoryProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  AllCategories: [] as CategoryProps[],
  selectedProduct: null,
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.AllCategories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCatLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setCategories, setSelectedCategory, setCatLoading } =
  categorySlice.actions;
export const selCategories = (state: RootState) =>
  state.categories.AllCategories;
export default categorySlice.reducer;
export const catLoading = (state: RootState) => state.categories.isLoading;
