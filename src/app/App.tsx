import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/Home";
import { PhonesPage } from "@pages/Phones";
import { TabletsPage } from "@pages/Tablets";
import { AccessoriesPage } from "@pages/Accessories";
import { FavoritesPage } from "@pages/Favorites";
import { CartPage } from "@pages/Cart";
import { useEffect } from "react";
import { applyGlobalStyles } from "@styles/global";
import { FavoritesProvider } from "@/shared/contexts/FavoritesContext";
import { CartProvider } from "@/shared/contexts/CartContext";

function App() {
  useEffect(() => {
    const cleanup = applyGlobalStyles();
    return cleanup;
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
            <Header />
            <main className="overflow-x-hidden flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/phones" element={<PhonesPage />} />
                <Route path="/tablets" element={<TabletsPage />} />
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
