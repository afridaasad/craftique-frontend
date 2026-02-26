import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isBuyer } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isBuyer) {
      alert("Only buyers can add to cart.");
      return;
    }

    try {
      setAdding(true);
      await API.post("/buyer/cart/", {
        product_id: product.id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover mb-6 rounded"
        />
      )}

      <h1 className="text-2xl font-semibold mb-2">
        {product.title}
      </h1>

      <p className="mb-4 text-gray-600">{product.description}</p>

      <p className="text-xl font-bold mb-4">
        ₹ {product.price}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetailsPage;