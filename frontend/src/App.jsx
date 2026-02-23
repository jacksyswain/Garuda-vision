import AppRoutes from "./app/routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
       <div className="bg-blue-600 text-white text-4xl p-10">
      Tailwind Is Working
    </div>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;