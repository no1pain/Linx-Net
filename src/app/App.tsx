import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/Home";
import { PhonesPage } from "@pages/Phones";
import { useEffect } from "react";
import { applyGlobalStyles } from "@styles/global";

function App() {
  useEffect(() => {
    const cleanup = applyGlobalStyles();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
        <Header />
        <main className="overflow-x-hidden flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<div>Tablets Page</div>} />
            <Route path="/accessories" element={<div>Accessories Page</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
