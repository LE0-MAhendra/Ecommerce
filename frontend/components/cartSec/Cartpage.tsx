"use client";
import { useApi } from "@/redux/services/axios";
import { Minus, Plus, SendToBack } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  TotalProdCart,
  addProduct,
  finishedLoading,
  DelProd,
} from "@/redux/features/Carts/cartSlice";
import { Button } from "../ui/button";
import Link from "next/link";
import CheckoutBtn from "./CheckoutBtn";
import { CartItemProps } from "@/types/types";

// ... (imports and other code)

const Cartpage = () => {
  const dispatch = useDispatch();
  const API = useApi();
  const allCartItems = useSelector(TotalProdCart);
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string | null>(null);
  let del_price = 0;
  let Total_price_del = 0;
  const fetchCart = async () => {
    try {
      const response = await API.get(`/items/cart/`);
      const data = response.data;
      if (data.length > 0) {
        dispatch(addProduct(data));
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching cart data");
    } finally {
      dispatch(finishedLoading());
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, []);
  const incrqty = async (prodId: string) => {
    const res = await API.post(`/items/incqty/${prodId}/`);
    if (res.data) {
      fetchCart();
    }
  };
  const decrqty = async (prodId: string) => {
    const res = await API.post(`/items/decqty/${prodId}/`);
    if (res.status === 200) {
      fetchCart();
    } else {
      dispatch(DelProd(prodId));
      fetchCart();
    }
  };
  if (allCartItems && allCartItems.length > 0) {
    del_price = Number(allCartItems[0].delivery_fee);
    Total_price_del = Number(allCartItems[0].final_price_del);
  }
  const DelItem = async (prodId: string) => {
    const res = await API.delete(`/items/DelCart/${prodId}/`);
    dispatch(DelProd(prodId));
    fetchCart();
  };
  const Checkout = async () => {
    const res = await API.post(`/items/checkout/`);
  };
  const finalPrice = () => {
    let val = Total_price_del || 0;
    return val;
  };
  const cartPrice = () => {
    if (!Array.isArray(allCartItems)) {
      return 0; // or handle the non-array case based on your requirements
    }
    let val = Number(allCartItems[0].final_price) || 0;
    return val;
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Data is Loading</p>;
  }
  return (
    <div className="h-screen bg-gray-100 pt-10">
      <div className="flex container mb-4">
        <Link href="/products" className="btn-two flex gap-2 mt-4">
          <SendToBack size={20} />
          Back
        </Link>
        <h1 className="mt-5 ml-[40px] text-center text-2xl font-bold">
          Cart Items
        </h1>
      </div>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {Array.isArray(allCartItems) &&
        allCartItems.length > 0 &&
        allCartItems[0].cart_items.length > 0 ? (
          <>
            <div className="rounded-lg md:w-2/3">
              {allCartItems[0].cart_items.map((cartItem: CartItemProps) => (
                <div
                  className="flex relative mb-6 rounded-lg bg-white p-6 shadow-xl"
                  key={cartItem.id}
                >
                  {/* Left Column - Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={`${cartItem.product?.image}`}
                      alt={cartItem.product?.name}
                      width={200}
                      height={200}
                      className="w-[150px] h-[100px] rounded-lg max-md:w-[100px] max-md:h-[80px]"
                    />
                  </div>
                  {/* Right Column - Name, Company, Price */}
                  <div className="flex max-sm:flex-col w-[80%]">
                    <div className="ml-4 flex-grow">
                      <h2 className="text-lg font-bold text-gray-900">
                        {cartItem.product?.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {cartItem.product?.brand?.name}
                      </p>
                    </div>
                    <div className="ml-auto flex sm:flex sm:flex-col sm:ml-6 ">
                      <div className="flex flex-col items-center space-y-6 mt-3 ">
                        <div className="flex items-center border-gray-100">
                          <Button
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 text-dark"
                            onClick={() => decrqty(cartItem.id)}
                          >
                            <Minus />
                          </Button>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={cartItem.cart_quantity}
                            onChange={(e) => e.target.value}
                            min="1"
                          />
                          <Button
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 text-dark"
                            onClick={() => incrqty(cartItem.id)}
                            disabled={
                              cartItem.cart_quantity >=
                              cartItem.product.quantity
                            }
                          >
                            <Plus />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-mono text-xl">
                            ₹ {cartItem.product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-2 top-2 hover:bg-gray-600 hover:rounded-full">
                    <button onClick={() => DelItem(cartItem.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="flex justify-between font-semibold text-lg">
                <p className="text-gray-900">Total Items</p>
                <p className="text-green-600">
                  {String(allCartItems[0].Total_qty)}
                </p>
              </div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{cartPrice ? cartPrice() : 0} ₹</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {String(allCartItems[0].delivery_fee)} ₹
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {finalPrice ? finalPrice() : 0} ₹
                  </p>
                  <p className="text-sm text-gray-700">including GST</p>
                </div>
              </div>
              <CheckoutBtn id={allCartItems[0].id} />
            </div>
          </>
        ) : (
          <div className="container w-full flex justify-center items-center h-auto">
            <span className="font-bold text-3xl max-md:text-[16px] mt-[20vh]">
              No Products Available in cart
            </span>
          </div>
        )}
      </div>

      <div className="m-8 md:hidden">
        <br />
      </div>
    </div>
  );
};

export default Cartpage;
