import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getArtisanProducts,
  deleteArtisanProduct,
} from "../../api/artisanApi";

const ArtisanProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getArtisanProducts();
      setProducts(res.data);
    } catch {
      setError("Failed to load your products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await deleteArtisanProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-stone-600">
        Loading your products...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold text-stone-800">
          My Products
        </h1>

        <Link
          to="/artisan/products/add"
          className="bg-stone-700 text-white px-5 py-2 rounded hover:bg-stone-800"
        >
          Add Product
        </Link>

      </div>

      {products.length === 0 ? (
        <p className="text-stone-600">
          You have not added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="border border-stone-200 rounded-lg p-4 bg-white shadow-sm"
            >

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}

              <h2 className="font-semibold text-stone-800">
                {product.title}
              </h2>

              <p className="text-stone-700 font-medium">
                ₹ {product.price}
              </p>

              <p className="text-sm text-stone-500 mb-3">
                Stock: {product.stock}
              </p>

              <div className="flex gap-2">

                <Link
                  to={`/artisan/products/${product.id}/edit`}
                  className="flex-1 text-center border border-stone-400 px-3 py-1 rounded hover:bg-stone-100"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ArtisanProducts;