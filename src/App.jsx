import {Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

// Public
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllProducts from "./pages/buyer/AllProducts";
import ProductDetailsPage from "./pages/buyer/ProductDetailsPage";

// Buyer
import CartPage from "./pages/buyer/Cart";
import WishlistPage from "./pages/buyer/Wishlist";
import BuyerOrders from "./pages/buyer/Orders";

// Artisan
import ArtisanProducts from "./pages/artisan/Products";
import AddProduct from "./pages/artisan/AddProduct";
import ArtisanOrders from "./pages/artisan/Orders";

// Layouts
import BuyerLayout from "./layouts/BuyerLayout";
import ArtisanLayout from "./layouts/ArtisanLayout";

function App() {
  return (
      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        {/* ===== BUYER ===== */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<AllProducts />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="orders" element={<BuyerOrders />} />
        </Route>

        {/* ===== ARTISAN ===== */}
        <Route
          path="/artisan"
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <ArtisanLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<ArtisanProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="orders" element={<ArtisanOrders />} />
        </Route>

      </Routes>
  );
}

export default App;