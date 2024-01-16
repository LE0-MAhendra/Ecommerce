"use client";
import SearchBar from "@/components/search/SearchBar";
import React, { useEffect } from "react";
import { CustomToggle } from "./Custom";
import { useDispatch, useSelector } from "react-redux";
import {
  brandLoading,
  selBrands,
  setBrandLoading,
  setBrands,
} from "@/redux/features/Items/BrandSlice";
import {
  catLoading,
  selCategories,
  setCatLoading,
  setCategories,
} from "@/redux/features/Items/categorySlice";
import { useApi } from "@/redux/services/axios";
import Spinner from "@/components/Spinner";

const LeftSec = () => {
  const API = useApi();
  const dispatch = useDispatch();
  const IsBRLoading = useSelector(brandLoading);
  const IscatLoading = useSelector(catLoading);
  const Brands = useSelector(selBrands);
  const Categories = useSelector(selCategories);

  useEffect(() => {
    async function fetchData() {
      try {
        if (Brands.length < 1) {
          const brandResponse = await API.get(`/products/allbrands/`);
          dispatch(setBrands(brandResponse.data));
        }
        if (Categories.length < 1) {
          const categoryResponse = await API.get(`/products/categories/`);
          dispatch(setCategories(categoryResponse.data));
        }
      } catch (error) {
        console.error("Error Fetching Data:", error);
      } finally {
        dispatch(setBrandLoading(false));
        dispatch(setCatLoading(false));
      }
    }
    fetchData();
  }, [dispatch, API]);

  return (
    <>
      {IsBRLoading && IscatLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="font-bold mb-2">Search</h1>
            <SearchBar />
          </div>
          <CustomToggle />
        </div>
      )}
    </>
  );
};

export default LeftSec;
