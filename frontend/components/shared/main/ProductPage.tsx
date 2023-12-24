import { useApi } from "@/redux/services/axios";
import { ProductsProps } from "@/types/types";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { SendToBack } from "lucide-react";
import AddBuyCart from "../../cartSec/AddBuyCart";
const ProductPage = () => {
  const API = useApi();
  const productData = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const product: ProductsProps | null = productData
    ? (productData as ProductsProps)
    : null;

  return (
    <div>
      {product ? (
        <>
          <Link href="/products" className="btn-two flex gap-2 w-[100px] mt-4">
            <SendToBack size={20} />
            Back
          </Link>
          <div className="flex h-auto gap-2 mt-5 max-md:flex-col ">
            <div className="w-[40%] flex justify-center items-center max-md:w-full">
              <Image
                src={`${product.image}`}
                alt={product.name}
                height={200}
                width={200}
                className="w-full h-full"
              />
            </div>
            <div className="p-3 w-[50%] gap-2 flex flex-col max-md:w-full">
              <h1 className="text-2xl">{product.name}</h1>
              <hr />
              <h2>
                Company{" "}
                <span className="text-orange-400">{product.brand?.name}</span>
              </h2>
              <p>
                Rating: <span>{product.rating}⭐</span>
              </p>
              <p className="text-zinc-400">M.R.P: ₹{product.price}</p>
              <h2 className="flex gap-4">
                Actual Price:
                <span className="text-xl">₹{product.sale_price}</span>
                {product.discount_percentage !== null && (
                  <p className="line-through text-red-400">
                    {product.discount_percentage}%
                  </p>
                )}
              </h2>
              <hr />
              {product.is_available ? (
                <AddBuyCart productId={product.id} />
              ) : (
                <span className="text-3xl text-red-500 font-semibold text-center">
                  Product Out of Stock 😔
                </span>
              )}
              {product.description && (
                <>
                  <hr />
                  <p className="line-clamp-5">
                    Description: {product.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
