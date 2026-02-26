import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await API.post("/auth/register/", {
        username: form.username,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        is_buyer: form.role === "buyer",
        is_artisan: form.role === "artisan",
      });

      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="full_name"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full p-2 border rounded mb-3"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-2 border rounded mb-4"
          value={form.role}
          onChange={handleChange}
        >
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;