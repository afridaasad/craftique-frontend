import { useEffect, useState } from "react";
import API from "../../services/api";

const ArtisanOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/artisan/orders/");
      setOrders(res.data);
    } catch {
      setError("Failed to load artisan orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      await API.patch(`/artisan/orders/${orderId}/update-status/`, {
        status,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch {
      setError("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Artisan Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
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
                  <p className="text-sm">
                    Buyer: {order.buyer_name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    Status: {order.status}
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

              {order.status === "pending" && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() =>
                      handleStatusUpdate(order.id, "approved")
                    }
                    disabled={updatingId === order.id}
                    className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(order.id, "denied")
                    }
                    disabled={updatingId === order.id}
                    className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanOrders;