import { useEffect, useState } from "react";
import { getBuyerOrders } from "../../api/buyerApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await getBuyerOrders();
      setOrders(res.data);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-5 space-y-4">
              
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    Status: {order.status}
                  </p>
                  <p className="text-sm">
                    Delivery: {order.delivery_status}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.product.title} × {item.quantity}
                    </span>
                    <span>
                      ₹ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 text-right font-semibold">
                Total: ₹ {parseFloat(order.total_amount).toFixed(2)}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;