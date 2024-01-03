"use client";
import { navitems } from "@/constants/constants";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout as setLogout, setUser } from "@/redux/features/Auth/authSlice";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { NumProd } from "@/redux/features/Carts/cartSlice";
import { useUserData } from "../hooks/useUserData";
const Usernav = () => {
  const router = useRouter();
  const numprod = useSelector(NumProd);
  // const userData = useUserData();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loggeduser } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(setLogout());
    router.push("/");
  };
  return (
    <div className="flex gap-3 items-center justify-center">
      <div className="text-xl capitalize">
        {/* add a user image at last */}
        {loggeduser ? (
          <div className="max-md:hidden">
            <span>welcome &nbsp;</span>
            <span className="text-orange-500 ">{loggeduser.first_name}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-2 mr-3 relative bg-zinc-100 p-1 rounded-md hover:scale-105 hover:shadow-lg">
        <Link href="/cart">
          <ShoppingCart />
        </Link>
      </div>
      {!isAuthenticated ? (
        navitems[0].userLinks.map((z, index) => (
          <Link href={z.link} key={index}>
            <Button className="btn-one text-xl shadow">{z.name}</Button>
          </Link>
        ))
      ) : (
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Usernav;
