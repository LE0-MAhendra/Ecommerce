import { Button } from "@/components/ui/button";
import { UserAuthenticated } from "@/redux/features/Auth/authSlice";
import {
  TotalProdCart,
  addProduct,
  cartLoading,
  setCartLoading,
} from "@/redux/features/Carts/cartSlice";
import { useApi } from "@/redux/services/axios";
import { CartItemProps } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { prodLoading } from "@/redux/features/Items/productSlice";
interface props {
  productId: string;
}
const AddBuyCart = ({ productId }: props) => {
  const API = useApi();
  const dispatch = useDispatch();
  const IsLoading = useSelector(prodLoading);
  const totalPrdCart = useSelector(TotalProdCart);
  const userAuth = useSelector(UserAuthenticated);
  const router = useRouter();
  const checkExists = (productId: string): boolean => {
    return totalPrdCart.some((cart) =>
      cart.cart_items.some(
        (cartItem: CartItemProps) => cartItem.product.id === productId
      )
    );
  };
  const handleAddCart = async (productId: string) => {
    if (userAuth) {
      //  instead of going to homepage it needs to stay in productpage for other checks
      if (checkExists(productId)) {
        toast.error("Product already exists in the cart");
      } else {
        try {
          const res = await API.post(`/items/addCartItem/${productId}/`);
          if (res.data) {
            dispatch(setCartLoading(true));
            dispatch(addProduct(res.data));
          }
          toast.success("Item added to cart successfully 🎉");
          router.push("/cart");
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setCartLoading(false));
        }
      }
    } else {
      // sessionStorage.setItem("redirectPath", router.asPath);
      router.push("/login");
    }
  };
  return (
    <>
      {IsLoading ? (
        <Spinner />
      ) : (
        <div className="flex gap-4 p-2">
          <Button
            className="bg-green-400 text-gray-600 hover:bg-green-500 text-xl"
            onClick={() => handleAddCart(productId)}
          >
            Add to cart
          </Button>
        </div>
      )}
    </>
  );
};

export default AddBuyCart;
