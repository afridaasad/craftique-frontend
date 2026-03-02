import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  removeCartItem,
  initiateCheckout,
  confirmCheckout,
} from "../../api/buyerApi";

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch {
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch {
      setError("Failed to remove item.");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      setCheckoutLoading(true);
      setCheckoutError("");

      const initRes = await initiateCheckout();
      const otp = initRes.data.otp;

      await confirmCheckout({
        otp,
        shipping_address: shippingAddress || "Not provided",
        phone_number: phoneNumber || "0000000000",
        payment_method: paymentMethod || "cod",
      });

      setCartItems([]);
      navigate("/buyer/orders");
    } catch {
      setCheckoutError("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading cart...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded"
              >
                {item.product.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.product.title}
                  </h2>
                  <p>₹ {item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  disabled={checkoutLoading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <textarea
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-3 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="cc">Credit Card</option>
            </select>
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ₹ {total.toFixed(2)}
            </h2>

            {checkoutError && (
              <p className="text-red-500 mt-2">
                {checkoutError}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="mt-4 bg-black text-white px-6 py-3 rounded disabled:opacity-50"
            >
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;