import axios from "axios";
import { toast } from "react-toastify";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async (
  id,
  image,
  type,
  userid,
  from,
  to,
  price,
  navigate
) => {
  const res = await loadRazorpayScript();

  if (!res) {
    toast.error("Failed to load Razorpay SDK");
    return;
  }

  const orderRes = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/payment/create-order`,
    {
      amount: price * 100,
    }
  );

  const { amount, id: order_id, currency } = orderRes.data.order;

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount,
    currency,
    name: "Travio",
    description: "Booking Payment",
    order_id,
    handler: async function (response) {
      const verifyRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/verify`,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          image,
          type,
          userid,
          from,
          to,
          price,
        }
      );

      if (verifyRes.data.success) {
        toast.success("Payment successful!");
        navigate(
          `/checkout?type=${type}&id=${id}&orderid=${response.razorpay_order_id}&paymentid=${response.razorpay_payment_id}`
        );
      } else {
        toast.error("Payment verification failed.");
      }
    },
    prefill: {
      name: "Travio",
      email: "yash@gmail.com",
    },
    theme: {
      color: "#000",
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};

export default handlePayment;
