import { useApi } from "@/redux/services/axios";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ProductsProps } from "@/types/types";
import {
  SearchProd,
  selProducts,
  selSearch,
  selfilSize,
  setFildata,
  setLoading,
  setProducts,
} from "@/redux/features/Items/productSlice";
import { Button } from "../../ui/button";
import SearchBar from "../../search/SearchBar";
import { toast } from "react-toastify";
const Card = () => {
  const API = useApi();
  const dispatch = useDispatch();
  const filsize = useSelector(selfilSize);
  const productData = useSelector(selProducts);
  const searchData = useSelector(selSearch);

  const handleReset = async () => {
    try {
      // Call the asynchronous function and wait for it to complete
      const res = await API.get("/products/");
      dispatch(setProducts(res.data));
      dispatch(setFildata(0));
      dispatch(SearchProd(""));
      dispatch(setLoading(false));
    } catch (error) {
      // Handle errors if needed
      console.error("Error resetting products:", error);
    }
  };
  const filteredProducts = productData.filter((data) => {
    if (typeof data.name === "string") {
      const productNameWithoutSpaces = data.name
        .replace(/\s/g, "")
        .toLowerCase();
      const searchDataWithoutSpaces = searchData
        .replace(/\s/g, "")
        .toLowerCase();

      return productNameWithoutSpaces.includes(searchDataWithoutSpaces);
    } else {
      toast("Select valid options");
      return false; // or handle the case in a way that fits your logic
    }
  });

  return (
    <>
      <div className="flex justify-center items-center w-full md:hidden px-2 mt-4">
        <SearchBar />
      </div>
      {filsize > 0 && (
        <div className="container flex justify-between">
          <h2 className="text-xl">
            <span className="font-bold">{filsize}</span> Results
          </h2>
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 p-4 h-auto max-md:items-center max-md:p-0 w-full">
        {filteredProducts.length === 0 ? (
          <div className="containe w-full flex justify-center items-center">
            <span className="font-bold text-3xl max-md:text-[16px] mt-[30%]">
              No Products Available
            </span>
          </div>
        ) : (
          filteredProducts.map((data: ProductsProps) => (
            <div
              key={data.id}
              className="bg-white flex flex-col gap-2 rounded-xl w-[220px] max-lg:w-[200px] max-md:w-[280px]  p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
            >
              <Link href={`/products/${data.id}`}>
                <div className="relative flex items-end overflow-hidden rounded-xl h-[150px]">
                  <Image
                    src={`${data.image}`}
                    alt={data.name}
                    height={200}
                    width={200}
                    className="w-full h-full rounded-t-lg"
                  />
                  <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-slate-400">
                      {data.rating}
                    </span>
                  </div>
                </div>
                <h2 className="ml-2 truncate text-md">{data.name}</h2>
                <div className="flex gap-2">
                  <Image
                    src={`${data.brand?.logo}`}
                    alt={data.name}
                    height={200}
                    width={200}
                    className="w-[25px] h-auto rounded-full ml-2"
                  />
                  <h3 className="text-zinc-400 ml-2 truncate">
                    {data.brand?.name}
                  </h3>
                </div>
                <div className="px-2">
                  {/* <p className="flex justify-between text-gray-400">
                  M.R.P: <span>₹{data.price}</span>
                </p> */}
                  <h2 className="flex justify-between">
                    Price:
                    <span className="flex gap-2">
                      <span className="text-blue-500">{data.sale_price} ₹</span>
                      {data.discount_percentage !== null && (
                        <p className="line-through">
                          {data.discount_percentage}%
                        </p>
                      )}
                    </span>
                  </h2>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Card;
