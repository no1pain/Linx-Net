import { Header } from "@widgets/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/phones" element={<div>Phones Page</div>} />
            <Route path="/tablets" element={<div>Tablets Page</div>} />
            <Route path="/accessories" element={<div>Accessories Page</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
