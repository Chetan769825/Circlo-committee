import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Site from "./components/Site";
import Home2 from "./components/Home2";
import ForgotPassword from "./components/ForgotPassword";
import Create from "./components/Create";
import Confirmation from "./components/confirmation";
import Join from "./components/Join";
import Detail from "./components/Detail";
import Dashboard from "./components/Dashboard";
import List from "./components/List";
import Collect from "./components/Collect";
import Chat from "./components/config/Chat";
import Rules from './components/Rules';



function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password", "/home2" ,"/collect", "/create" , "/dashboard" , "/confirmation" , "/chat", "/rules"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Site/>} />
        <Route path="/home" element={<Site />}/>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create" element={<Create />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/join" element={<Join />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<List />} />
        <Route path="/collect" element={<Collect />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/rules" element={<Rules />} />


      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
