import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
// Remove AuthProvider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Remove AuthProvider */}
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);