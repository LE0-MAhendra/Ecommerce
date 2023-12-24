"use client";
import { selOrders, setOrders } from "@/redux/features/Orders/OrderSlice";
import { useApi } from "@/redux/services/axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Image from "next/image";
import { CartItemProps } from "@/types/types";
const Orderpage = () => {
  const API = useApi();
  const dispatch = useDispatch();
  const allOrders = useSelector(selOrders);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await API.get("/items/orders/");
        dispatch(setOrders(res.data));
      } catch (error) {
        console.error("Error retriving orders", error);
      }
    };
    getOrders();
  }, []);
  console.log(allOrders.length);
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
      {allOrders.length === 0 || "undefined" ? (
        <div className="flex justify-center items-center h-[80vh] flex-col">
          <h1 className="text-2xl text-red-600">No orders Till now</h1>
        </div>
      ) : (
        allOrders.length > 0 &&
        allOrders.map((data) => (
          <div className="flex gap-2 h-auto bg-green-400" key={data.id}>
            <div className="flex flex-col container gap-2 shadow-xl">
              <div className="flex text-2xl justify-between items-center w-[100%]">
                <h1>
                  Order <span className="text-green-400">{data.id}</span>
                </h1>
                <Link href="/" className="text-orange-400">
                  view invoice
                </Link>
              </div>
              <hr />
              <div className="flex flex-col gap-4 text-xl">
                <div className="flex justify-between">
                  <h1>{data.user?.email}</h1>
                  <h2>
                    Items Ordered{" "}
                    <span className="text-red-500">
                      {data.cart && String(data.cart.Total_qty)}
                    </span>
                  </h2>
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col gap-4 flex-1">
                    {data.cart?.cart_items.map((item: CartItemProps) => (
                      <div className="flex" key={item.id}>
                        <Image
                          src={`${item.product?.image}`}
                          alt="image"
                          height={100}
                          width={100}
                          className="w-[130px] h-auto"
                        />
                        <div className="flex flex-col ml-5">
                          <h2>{item.product?.name}</h2>
                          <h2 className="text-zinc-300">
                            {item.product?.brand?.name}
                          </h2>
                          <h1>
                            items <span>{item.cart_quantity}</span>
                          </h1>
                        </div>
                      </div>
                    ))}
                    <h2>
                      Ordered at <span>01-12-2023 12:22 PM</span>
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold">
                      {" "}
                      Shipping Address
                    </h1>
                    <hr />
                    <h2>Antartica,NorthPole</h2>
                    <h3>Near Burmuda Triangle</h3>
                    <h2>
                      Price <span>4000 $ ₹</span>
                    </h2>
                    <h1>
                      Delivery Date{" "}
                      <span className="text-gray-700 font-bold">
                        01-01-0001 BC
                      </span>
                    </h1>
                    <h2 className="text-orange-500">Happy Shopping !</h2>
                  </div>
                </div>
                <h2 className="mb-4"></h2>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orderpage;
