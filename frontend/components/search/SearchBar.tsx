import React from "react";
import { useDispatch } from "react-redux";
import { SearchProd } from "@/redux/features/Items/productSlice";
import { Input } from "../ui/input";
const SearchBar = () => {
  const dispatch = useDispatch();
  const change = (e: any) => {
    const { value } = e.target;
    dispatch(SearchProd(value));
  };
  return (
    <div className="w-full">
      <div className="relative flex mb-2 shadow-lg p-2 rounded-md">
        <Input
          className="flex-1 bg-zinc-200 text-black"
          placeholder="Search Product"
          onChange={change}
        />
      </div>
    </div>
  );
};

export default SearchBar;
