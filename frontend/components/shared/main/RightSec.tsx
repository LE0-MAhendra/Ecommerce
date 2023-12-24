"use client";
import { useEffect } from "react";
import { useApi } from "@/redux/services/axios";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "@/redux/features/Items/productSlice";
import Card from "./Card";
const RightSec = () => {
  const API = useApi();

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        await API.get("/products/")
          .then((response) => {
            dispatch(setProducts(response.data));
            dispatch(setLoading(false));
          })
          .catch((error) => {
            console.error("Error Fetching Products:", error);
          });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [dispatch, API]);
  return (
    <div className="flex flex-wrap justify-between gap-4 p-4 h-auto  max-md:p-0">
      <Card />
    </div>
  );
};

export default RightSec;
