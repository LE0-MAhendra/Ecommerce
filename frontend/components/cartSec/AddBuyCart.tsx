import { Button } from "@/components/ui/button";
import { UserAuthenticated } from "@/redux/features/Auth/authSlice";
import { TotalProdCart, addProduct } from "@/redux/features/Carts/cartSlice";
import { useApi } from "@/redux/services/axios";
import { CartItemProps } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface props {
  productId: string;
}
const AddBuyCart = ({ productId }: props) => {
  const API = useApi();
  const dispatch = useDispatch();
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
      if (checkExists(productId)) {
        toast.error("Product already exists in the cart");
      } else {
        try {
          const res = await API.post(`/items/addCartItem/${productId}/`);
          dispatch(addProduct(res.data));
          toast.success("Item added to cart successfully 🎉");
          router.push("/cart");
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      router.push("/login");
    }
  };
  return (
    <>
      {/* <RequireAuth> */}
      <div className="flex gap-4 p-2">
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={() => handleAddCart(productId)}
        >
          Add to cart
        </Button>
        <Button className="bg-green-400 text-white hover:bg-green-500">
          Buy Now
        </Button>
      </div>
      {/* </RequireAuth> */}
    </>
  );
};

export default AddBuyCart;