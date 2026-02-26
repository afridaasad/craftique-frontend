import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

// ===== ACTIVE V1 PAGES (REBUILD CORE) =====

// You will rebuild these pages cleanly
// Create minimal versions if they don’t exist yet


import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// PUBLIC
import AllProducts from "./pages/buyer/AllProducts";
import ProductDetailsPage from "./pages/buyer/ProductDetailsPage";

// BUYER
import CartPage from "./pages/buyer/Cart";
import WishlistPage from "./pages/buyer/Wishlist";
import BuyerOrders from "./pages/buyer/Orders";

// ARTISAN
import ArtisanProducts from "./pages/artisan/Products";
import AddProduct from "./pages/artisan/AddProduct";
import ArtisanOrders from "./pages/artisan/Orders";

function App() {
  return (
    <Router>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        {/* ===== BUYER ROUTES ===== */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerOrders />
            </ProtectedRoute>
          }
        />

        {/* ===== ARTISAN ROUTES ===== */}
        <Route
          path="/artisan/products"
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <ArtisanProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artisan/products/add"
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artisan/orders"
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <ArtisanOrders />
            </ProtectedRoute>
          }
        />

        {/* ===== LEGACY ROUTES (COMMENTED FOR MEMORY) ===== */}

        {/*
        Home
        AboutUs
        ContactUs
        ForgotPassword
        ForgotPasswordSecurity
        RoleRedirect

        BuyerDashboard
        BuyerProfile

        ArtisanDashboard
        ArtisanProfile
        ListingGuidelines
        ArtisanPayments
        ArtisanAnalytics

        AdminDashboard
        */}

      </Routes>
    </Router>
  );
}

export default App;