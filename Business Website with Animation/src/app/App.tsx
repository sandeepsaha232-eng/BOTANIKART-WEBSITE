import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { PlantCostAnalyzerProvider, PlantCostModal } from "./components/PlantCostAnalyzer";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PlantCostAnalyzerProvider>
          <RouterProvider router={router} />
          <PlantCostModal />
        </PlantCostAnalyzerProvider>
      </CartProvider>
    </AuthProvider>
  );
}
