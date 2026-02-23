import { Routes, Route, useLocation } from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Cart from "./pages/Cart";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";


function App() {
   

  const [searchTerm, setSearchTerm] = useState("");

  

  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup" ,"/", "/admin", "/welcome"];

  return (
<>

      {!hideNavbarRoutes.includes(location.pathname) && (
<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>)}

<Routes>
<Route path="/" element={<Welcome />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/home" element={<Home searchTerm={searchTerm} />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/cart" element={<Cart />} />
<Route path="/category/:category" element={<CategoryPage/>}/>
<Route path="/account" element={<Account/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/welcome" element={<Welcome/>}/>

</Routes>
<Footer/>
</>


  );

}

export default App;
 
