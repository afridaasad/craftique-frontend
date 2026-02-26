import { useEffect, useState } from "react";
import API from "../../services/api";

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      const response = await API.get("/buyer/wishlist/");
      setItems(response.data);
    } catch {
      setError("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await API.delete(`/buyer/wishlist/${productId}/`);
      setItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    } catch {
      alert("Failed to remove item.");
    }
  };

  if (loading) return <div className="p-6">Loading wishlist...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
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
              </div>

              <button
                onClick={() =>
                  handleRemove(item.product.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;