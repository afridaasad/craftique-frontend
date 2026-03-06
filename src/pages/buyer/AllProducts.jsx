import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../../api/buyerApi";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        page,
        search,
      });

      setProducts(res.data.results || res.data);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      search: searchInput,
      page: 1,
    });
  };

  const goToPage = (p) => {
    setSearchParams({
      search,
      page: p,
    });
  };

  if (loading)
    return (
      <div className="p-6 text-center text-stone-600">
        Loading products...
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

      <h1 className="text-3xl font-semibold mb-6 text-stone-800">
        Handmade Products
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Search handmade items..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 border border-stone-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
        />

        <button
          className="bg-stone-700 text-white px-6 py-3 rounded hover:bg-stone-800 transition"
        >
          Search
        </button>
      </form>

      {products.length === 0 ? (
        <p className="text-stone-600">
          No products found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="border border-stone-200 rounded-lg p-4 hover:shadow-lg transition bg-white"
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

                <p className="text-sm text-stone-500">
                  {product.category}
                </p>

              </Link>
            ))}

          </div>

          <div className="flex justify-center gap-4 mt-10">

            <button
              onClick={() => goToPage(Number(page) - 1)}
              disabled={page <= 1}
              className="px-4 py-2 border border-stone-300 rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-stone-700">
              Page {page}
            </span>

            <button
              onClick={() => goToPage(Number(page) + 1)}
              className="px-4 py-2 border border-stone-300 rounded"
            >
              Next
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;