import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import {
  getProductDetails,
  addToCart,
  addToWishlist,
} from "../../api/buyerApi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isBuyer } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetails(id);
        setProduct(res.data);
      } catch {
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
      setAddingCart(true);

      await addToCart({
        product_id: product.id,
        quantity: 1,
      });

      alert("Added to cart!");
    } catch {
      alert("Failed to add to cart.");
    } finally {
      setAddingCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isBuyer) {
      alert("Only buyers can add to wishlist.");
      return;
    }

    try {
      setAddingWishlist(true);

      await addToWishlist({
        product_id: product.id,
      });

      alert("Added to wishlist!");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Already in wishlist or failed."
      );
    } finally {
      setAddingWishlist(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-stone-600">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover mb-6 rounded"
        />
      )}

      <h1 className="text-3xl font-semibold mb-3 text-stone-800">
        {product.title}
      </h1>

      <p className="mb-6 text-stone-600">
        {product.description}
      </p>

      <p className="text-2xl font-bold mb-6 text-stone-900">
        ₹ {product.price}
      </p>

      <div className="flex gap-4">

        <button
          onClick={handleAddToCart}
          disabled={addingCart}
          className="bg-stone-700 text-white px-6 py-3 rounded hover:bg-stone-800 disabled:opacity-50"
        >
          {addingCart ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={handleAddToWishlist}
          disabled={addingWishlist}
          className="border border-stone-700 text-stone-700 px-6 py-3 rounded hover:bg-stone-100 disabled:opacity-50"
        >
          {addingWishlist ? "Adding..." : "Add to Wishlist"}
        </button>

      </div>

    </div>
  );
};

export default ProductDetailsPage;