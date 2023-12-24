"use client";
import SearchBar from "@/components/search/SearchBar";
import React, { useEffect } from "react";
import { CustomToggle } from "./Custom";
import { useDispatch } from "react-redux";
import { setBrands } from "@/redux/features/Items/BrandSlice";
import { setCategories } from "@/redux/features/Items/categorySlice";
import { useApi } from "@/redux/services/axios";

const LeftSec = () => {
  const API = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const brandResponse = await API.get(`/products/allbrands`);
        dispatch(setBrands(brandResponse.data));

        const categoryResponse = await API.get(`/products/categories`);
        dispatch(setCategories(categoryResponse.data));
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    }
    fetchData();
  }, [dispatch, API]);

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="font-bold mb-2">Search</h1>
        <SearchBar />
      </div>
      {/* <h2>Price customization</h2> */}
      <CustomToggle />
    </div>
  );
};

export default LeftSec;
