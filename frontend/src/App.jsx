import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

// páginas
import Login from "./pages/Login";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Sucesso from "./pages/Sucesso";
import Cancelado from "./pages/Cancelado";

export default function App() {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u) {
        setIsPro(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <h2 style={{ padding: 20 }}>Carregando...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login / Home */}
        <Route
          path="/"
          element={user ? <Home user={user} isPro={isPro} /> : <Login />}
        />

        {/* Redirecionamento afiliado */}
        <Route path="/r/:id" element={<Redirect />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/cancelado" element={<Cancelado />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Login />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={user ? <Admin user={user} /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}