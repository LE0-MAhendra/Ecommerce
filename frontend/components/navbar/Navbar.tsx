import Link from "next/link";
import { navitems } from "@/constants/constants";
import Usernav from "./Usernav";
import Mob from "./Mob";
const Navbar = () => {
  return (
    <nav className="h-12 flex items-center justify-between shadow-lg px-3 relative rounded-md mt-2">
      <div className="text-2xl">
        <Link href={"/"} className="text-cyan-500 ">
          {navitems[0].title}
        </Link>
      </div>
      <div className="max-md:hidden flex flex-row justify-between items-center">
        {navitems[0].links.map((mainitem, index) => (
          <Link
            href={mainitem.link}
            key={index}
            className="mx-4 hover:border-b-2 hover:border-red-500 transition duration-300 ease-in text-[18px]"
          >
            {mainitem.name}
          </Link>
        ))}
      </div>
      <div className="max-md:hidden flex flex-row justify-between items-center">
        <Usernav />
      </div>
      <div className="md:hidden ">
        <Mob />
      </div>
    </nav>
  );
};

export default Navbar;
