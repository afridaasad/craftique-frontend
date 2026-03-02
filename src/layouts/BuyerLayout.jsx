import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BuyerLayout() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div>
      <header>
        <h3>Buyer Panel</h3>
        <span>{user?.username}</span>
        <button onClick={logout}>Logout</button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}