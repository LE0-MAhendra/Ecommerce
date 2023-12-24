import React from "react";
import { Button } from "../ui/button";
import { useApi } from "@/redux/services/axios";
import { useAppSelector } from "@/redux/hooks";

function loadScript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const CheckoutBtn = ({ id }: any) => {
  const API = useApi();
  const { loggeduser } = useAppSelector((state) => state.auth);
  const { first_name, last_name, email } = loggeduser || {
    first_name: "",
    last_name: "",
    email: "",
  };

  const full_name = first_name + last_name;
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
      );
      return;
    }

    const orderData = await API.post(`/items/createOrder/${id}/`);
    console.log(orderData);

    const { amount, currency, order_id } = orderData.data;

    const options = {
      key: process.env.RAZOR_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: { first_name } || "Test",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response: any) {
        const razorpay_paymentId = response.razorpay_payment_id;
        const razorpay_orderId = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;

        const res = await API.post(`items/verifySignature/${id}/`, {
          razorpay_paymentId,
          razorpay_orderId,
          razorpay_signature,
        });

        alert(res.data.status);
      },
      prefill: {
        name: { full_name },
        email: { email },
      },
      theme: {
        color: "#40c9ef",
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }
  return (
    <Button
      className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      onClick={displayRazorpay}
    >
      Check out
    </Button>
  );
};

export default CheckoutBtn;
