import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Index from "./pages/Index";
import { BmvContextProvider } from "./contexts/bmvContext";
import AuthController from "./pages/auth/AuthController";

function App() {
  return (
    <BrowserRouter>
      <BmvContextProvider>
        <Routes>
          <Route path="/auth" element={<AuthController />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Index />}></Route>
        </Routes>
      </BmvContextProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
