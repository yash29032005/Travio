import { Link, useSearchParams } from "react-router-dom";

function Checkout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderid = searchParams.get("orderid");
  const paymentid = searchParams.get("paymentid");
  const type = searchParams.get("type");

  const downloadTicket = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/api/${type}/ticket/${id}?orderid=${orderid}&paymentid=${paymentid}`,
      "_blank"
    );
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh", width: "100vw" }}
    >
      <h1>Payment Successful</h1>
      <h5>Order ID: {orderid}</h5>
      <h5>Payment ID: {paymentid}</h5>
      <button className="btn btn-primary mb-2" onClick={downloadTicket}>
        Download Ticket
      </button>
      <Link className="btn btn-primary" to={`${process.env.REACT_APP_WEB_URI}`}>
        Go Back
      </Link>
    </div>
  );
}

export default Checkout;
