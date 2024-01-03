"use client";
import {
  ordLoading,
  setOrderLoading,
  setOrders,
} from "@/redux/features/Orders/OrderSlice";
import { useApi } from "@/redux/services/axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Orderscards from "./Orderscards";
import Spinner from "../Spinner";
const Orderpage = () => {
  const API = useApi();
  const dispatch = useDispatch();
  const IsLoading = useSelector(ordLoading);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await API.get("/items/orders/");
        dispatch(setOrders(res.data));
      } catch (error) {
        console.error("Error retriving orders", error);
      } finally {
        dispatch(setOrderLoading(false));
      }
    };
    getOrders();
  }, []);
  return (
    <div className="flex flex-col mt-3 gap-3">
      <div className="flex ">
        <Link href="/products">
          <Button className="btn-two">Back</Button>
        </Link>
        <h1 className="flex justify-center items-center w-full text-3xl font-bold">
          Your Orders
        </h1>
      </div>
      {IsLoading ? <Spinner /> : <Orderscards />}
    </div>
  );
};

export default Orderpage;
