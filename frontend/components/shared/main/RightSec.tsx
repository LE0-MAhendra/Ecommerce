"use client";
import { useEffect } from "react";
import { useApi } from "@/redux/services/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  prodLoading,
  setProdLoading,
  setProducts,
} from "@/redux/features/Items/productSlice";
import Card from "./Card";
import Spinner from "@/components/Spinner";
const RightSec = () => {
  const API = useApi();
  const IsLoading = useSelector(prodLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        await API.get("/products/")
          .then((response) => {
            dispatch(setProducts(response.data));
          })
          .catch((error) => {
            console.error("Error Fetching Products:", error);
          });
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setProdLoading(false));
      }
    }
    fetchData();
  }, [dispatch, API]);
  return (
    <>
      {IsLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-between gap-4 p-4 h-auto  max-md:p-0">
          <Card />
        </div>
      )}
    </>
  );
};

export default RightSec;
