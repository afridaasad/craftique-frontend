import { useEffect, useState } from "react";
import API from "../../services/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const response = await API.get("/buyer/cart/");
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
      await API.delete(`/buyer/cart/${id}/`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to remove item.");
    }
  };

  if (loading) return <div className="p-6">Loading cart...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
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
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ₹ {total.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;