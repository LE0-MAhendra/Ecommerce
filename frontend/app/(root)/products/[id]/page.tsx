"use client";
import { useApi } from "@/redux/services/axios";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setSelectedProduct,
} from "@/redux/features/Items/productSlice";
import ProductPage from "@/components/shared/main/ProductPage";

const Page = ({ params }: any) => {
  const API = useApi();
  const dispatch = useDispatch();
  async function fetchData() {
    try {
      await API.get(`/products/${params.id}/`).then((response) => {
        dispatch(setSelectedProduct(response.data));
        dispatch(setLoading(false));
      });
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
  return (
    <div>
      <ProductPage />
    </div>
  );
};

export default Page;
