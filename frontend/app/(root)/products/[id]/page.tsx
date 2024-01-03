"use client";
import { useApi } from "@/redux/services/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  prodLoading,
  setProdLoading,
  setSelectedProduct,
} from "@/redux/features/Items/productSlice";
import ProductPage from "@/components/shared/main/ProductPage";
import { loadingState, setLoading } from "@/redux/features/Auth/authSlice";
import Spinner from "@/components/Spinner";

const Page = ({ params }: any) => {
  const API = useApi();
  const dispatch = useDispatch();
  const IsLoading = useSelector(prodLoading);
  async function fetchData() {
    try {
      dispatch(setSelectedProduct(""));
      await API.get(`/products/${params.id}/`).then((response) => {
        dispatch(setSelectedProduct(response.data));
        dispatch(setLoading(false));
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setProdLoading(false));
    }
  }

  fetchData();
  return <div>{IsLoading ? <Spinner /> : <ProductPage />}</div>;
};

export default Page;
