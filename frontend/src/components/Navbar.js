import { useNavigate } from "react-router-dom";

import {useEffect,useState} from "react";

import { useCart } from "../context/CartContext";

import {FiShoppingCart} from "react-icons/fi";

import "../styles/navbar.css";

export default function Navbar({ searchTerm, setSearchTerm }) {


const [user, setUser] = useState(JSON.parse(localStorage.getItem("user" || "null")));
const [profileOpen, setProfileOpen] = useState(false);
const [recentOrders, setRecentOrders]=useState([]);
const [products, setProducts] = useState([]);

useEffect(() => {

  const fetchProducts = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/products");

      const data = await res.json();

      setProducts(data.products || []);

    } catch (err) {

      console.error("Navbar fetch error:", err);

    }

  };


  const fetchRecentOrders = async () => {

  if (!user?._id) return;

  try {

    const res = await fetch(

      `http://localhost:5000/api/orders/recent/${user._id}`

    );

    const data = await res.json();
    console.log("recent:", data);

    setRecentOrders(data || []);

  } catch (err) {

    console.error("Recent orders error", err);

  }

};

  fetchProducts();
  fetchRecentOrders();

}, []);















 









  const navigate = useNavigate();
  const {cartItems}=useCart();

  const cartCount=cartItems.reduce((total,item)=>total+item.qty,0);

  const suggestions = products.filter((p)=>

    p.name.toLowerCase().includes(searchTerm.toLowerCase())

  );

  
 const minutesLeft = (createdAt) => {

  const diff = 45 * 60 * 1000 - (Date.now() - new Date(createdAt));

  return Math.max(Math.ceil(diff / 60000), 0);

};
 

  return (
<div className="navbar">

    {/* LEFT: Logo */}
<div className="nav-left" onClick={() => navigate("/home")}>
<img

        src="\images\logo.jpg"

        alt="CakeSquare"

        className="nav-logo"

      />
</div>

    {/* CENTER: Search */}
<div className="nav-center">
<input

        className="search"

        placeholder="Search cakes..."

        value={searchTerm}

        onChange={(e) => setSearchTerm(e.target.value)}

      />

      {searchTerm && suggestions.length > 0 && (
<div className="search-dropdown">

          {suggestions.slice(0, 6).map((item) => (
<div

              key={item._id}

              className="search-item"

              onClick={() => {

                setSearchTerm("");

                navigate(`/product/${item._id}`);

              }}
>
<img src={item.image} alt={item.name} />
<span>{item.name}</span>
</div>

          ))}
</div>

      )}
</div>

    {/* RIGHT: Actions */}

<div className="nav-right">
 {/* CART */}
<span

  onClick={() => navigate("/cart")}

  className="cart-icon-wrapper"
>
<FiShoppingCart className="cart-icon" />

  {cartCount > 0 && (
<span className="cart-badge">{cartCount}</span>

  )}
</span>
 
 {/* PROFILE */}
 {user && (
<div className="profile-wrapper">
<div className="profile-avatar" onClick={() => setProfileOpen(!profileOpen)}> {user?.email?.charAt(0)?.toUpperCase()|| "U"}</div>
  {profileOpen && (
<div className="profile-dropdown">
<div className="profile-info">
<p className="profile-email">{user.email}</p>
</div>

<span onClick={() => navigate("/account")}>Order History</span>
<span Click={() => {localStorage.removeItem("user"); navigate("/login");}} className="logout">Log Out</span>

<hr />
</div>
     )}
</div>
 )}
</div>










</div>
  )}
