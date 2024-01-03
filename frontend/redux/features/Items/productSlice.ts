import { ProductsProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState = {
  isLoading: true,
  AllProducts: [] as ProductsProps[],
  selectedProduct: null,
  productsize: 0,
  filProdSize: 0,
  searchText: "",
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const data = action.payload;
      state.AllProducts = data;
      state.productsize = state.AllProducts.length;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProdLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFildata: (state, action) => {
      state.filProdSize = Number(action.payload);
    },
    SearchProd: (state, action) => {
      state.searchText = action.payload;
    },
    ResetProd: (state) => {
      initialState;
    },
  },
});
export const {
  setProducts,
  setSelectedProduct,
  setProdLoading,
  ResetProd,
  setFildata,
  SearchProd,
} = productSlice.actions;
export const selProducts = (state: RootState) => state.products.AllProducts;
export const selSize = (state: RootState) => state.products.productsize;
export const selfilSize = (state: RootState) => state.products.filProdSize;
export default productSlice.reducer;
export const selSearch = (state: RootState) => state.products.searchText;
export const prodLoading = (state: RootState) => state.products.isLoading;
