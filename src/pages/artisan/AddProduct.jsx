import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Pottery",
    price: "",
    stock: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (form.image) {
        formData.append("image", form.image);
      }

      await API.post("/artisan/products/add/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/artisan/products", { replace: true });
    } catch (err) {
      setError("Failed to add product.");
    }

    setSubmitting(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={handleChange}
        >
          <option>Pottery</option>
          <option>Woodcraft</option>
          <option>Textiles</option>
          <option>Jewelry</option>
          <option>Leatherwork</option>
          <option>Sculptures</option>
        </select>

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full p-2 border rounded"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;