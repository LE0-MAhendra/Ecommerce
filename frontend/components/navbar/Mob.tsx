"use client";
import { useState } from "react";
import { navitems } from "@/constants/constants";
import { AlignRight, BadgeX } from "lucide-react";
import Link from "next/link";
import Usernav from "./Usernav";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
const Mob = () => {
  const [open, setOpen] = useState(false);
  const { loggeduser } = useAppSelector((state) => state.auth);

  return (
    <div>
      <div className="flex gap-2">
        {loggeduser ? (
          <div className="text-xl flex">
            <span className="text-orange-500 md:hidden mt-2">
              {loggeduser.first_name}
            </span>
          </div>
        ) : (
          ""
        )}
        <Button onClick={() => setOpen(!open)} variant="outline" size="icon">
          {open ? <BadgeX /> : <AlignRight />}
        </Button>
      </div>
      {open && (
        <div className="absolute top-12 right-0 h-auto flex flex-col w-[150px] px-3 bg-gray-100 rounded-lg z-10">
          {navitems[0].links.map((navitem, index) => (
            <Link
              href={navitem.link}
              key={index}
              className="flex my-2 justify-center text-lg"
            >
              {navitem.name}
            </Link>
          ))}
          <Usernav />
        </div>
      )}
    </div>
  );
};

export default Mob;
