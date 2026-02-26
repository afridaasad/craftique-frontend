import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products/");
        setProducts(response.data.results || response.data);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
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
                {product.category}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;