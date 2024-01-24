require("dotenv").config({ path: "../../.env" });
export const MyBaseURl =
  process.env.NEXT_PUBLIC_HOST || "http://127.0.0.1:8000/store";
export const MyRedirectUri =
  process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost";
export const navitems = [
  {
    title: "Store",
    links: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Products",
        link: "/products",
      },
      {
        name: "My Orders",
        link: "/orders",
      },
    ],
    userLinks: [
      {
        name: "Sign In",
        link: "/login",
      },
    ],
  },
];
