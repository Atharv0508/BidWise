import { useEffect, useState } from "react";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(`Backend status: ${data.status}`);
      })
      .catch(() => {
        setBackendStatus("Backend is not connected");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500">
      <h1 className="text-4xl font-bold text-white mb-4">
        BidWise 🚀
      </h1>

      <p className="text-xl text-white">
        {backendStatus}
      </p>
    </div>
  );
}

export default App;