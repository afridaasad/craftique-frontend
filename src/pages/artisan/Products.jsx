import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const ArtisanProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtisanProducts = async () => {
      try {
        const response = await API.get("/artisan/products/");
        setProducts(response.data);
      } catch {
        setError("Failed to load your products.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanProducts();
  }, []);

  if (loading) return <div className="p-6">Loading your products...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Products</h1>

      {products.length === 0 ? (
        <p>You have not added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="border p-4 rounded shadow-sm block hover:shadow-md transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-3 rounded"
                />
              )}

              <h2 className="font-semibold">{product.title}</h2>
              <p>₹ {product.price}</p>
              <p className="text-sm text-gray-500">
                Stock: {product.stock}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanProducts;