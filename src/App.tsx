// import { set } from "date-fns";
import { CreateSlotDialouge } from "./components/CreateSlotDialouge";
// import NavBar from "./components/NavBar";
// import SlotBox from "./components/SlotBox";
// import { useState } from "react";
// import { ScrollArea } from "./components/ui/scroll-area";
// import {slots as slotArr} from "@/db";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Index from "./pages/Index";
import { BmvContextProvider } from "./contexts/bmvContext";
import AuthController from "./pages/auth/AuthController";

// type slot = {id:string, start:Date, end: Date, price:number, status:"booked"|"blocked"|"available"}

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
