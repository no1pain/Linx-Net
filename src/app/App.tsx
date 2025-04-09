import { Header } from "@widgets/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Welcome to Linx-Net
          </h1>
          <p className="text-gray-600">
            If you can see this styled text, Tailwind is working correctly!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
