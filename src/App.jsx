import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/" },
  { label: "About us", to: "/" },
  { label: "Services", to: "/" },
  { label: "Blog", to: "/" },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (count) => {
    setCartCount((prev) => prev + count);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <Link to="/" className="text-3xl font-bold text-[#c97b39]">
            Local Face
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "text-[#c97b39]" : "hover:text-[#c97b39]"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <span>🔍</span>
            <span>👤</span>
            <span>❤</span>
            <div className="rounded-full border border-amber-300 px-3 py-1 text-center">
              🛒 {cartCount}
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet context={{ addToCart, cartCount }} />
      </main>
    </div>
  );
}