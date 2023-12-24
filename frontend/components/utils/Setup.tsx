"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVerify } from "../hooks";

export default function App() {
  
  useVerify();
  return <ToastContainer />;
}
