import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import Confetti from "react-confetti";
import TestimonialModal from "../components/TestimonialModal";
 

import "../styles/cart.css";





const Cart = () => {
  const  {user} =useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showSuccessModal, setShowSuccessModal]= useState("");
  const[showReviewForm, setShowReviewForm]=useState(false);
 

  useEffect(() => {

  if (!user?.email) return;

  fetch(`http://localhost:5000/api/addresses/${user.email}`)

    .then(res => res.json())

    .then(data => {

      setAddresses(data);

      const defaultAddr = data.find(a => a.isDefault);

      if (defaultAddr) setSelectedAddress(defaultAddr.addressText);

    });

}, [user]);
 
 

 

  const {

    cartItems,

    increment,

    decrement,

    getTotalAmount,

    clearCart,} = useCart();

 
 

const navigate = useNavigate();

const handlePlaceOrder = async () => {


  const finalAddress = newAddress.trim() !== "" ? newAddress : selectedAddress;
  
  if (saveAddress && newAddress.trim()) {

  await fetch("http://localhost:5000/api/addresses", {

    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({

      email: user.email,

      addressText: newAddress,
      label:"Home",

      isDefault: true

    })

  });

}
 






  if (!user) {

    alert("Please login first");

    return;

  }

  try {

    const res = await fetch("http://localhost:5000/api/orders", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        email: user.email,

        items: cartItems,

        total: getTotalAmount(),

        address: finalAddress, saveAddress

      }),

    });

    if (!res.ok) throw new Error("Order failed");

   setShowSuccessModal(true);
 

   

  } 


  
  catch (err) {

    console.error(err);

    alert("❌ Failed to place order");

  }

};
 

  if (cartItems.length === 0) {
    return (
<div className="cart-page">
<h2>Your cart is empty</h2>
</div>);}


  

  return (
    
<div className="cart-page">


   {showSuccessModal && (
    <>
<Confetti
       width={window.innerWidth}
       height={window.innerHeight}
       numberOfPieces={450}
       gravity={0.2}
       initialVelocityX={25}
       initialVelocityY={10}
       recycle={false}
       tweenDuration={100}
      style={{

        position: "fixed",

        top: 0,

        left: 0,

        zIndex: 1002,

        pointerEvents: "none",
      }}
       
     />
     <TestimonialModal
       setShowReviewForm={setShowReviewForm}
       setShowSuccessModal={setShowSuccessModal}
       clearCart={clearCart}
     
   />

</>

   )}
<h2>Your Cart</h2>
{cartItems.map((item) => (
<div className="cart-item" key={item.id}>
<img src={item.img || item.image} alt={item.name} />
<div className="cart-info">
<h4>{item.name}</h4>
<p>₹ {item.price}</p>
<div className="qty-controls">
<button onClick={() => decrement(item.id)}>-</button>
<span>{item.qty}</span>
<button onClick={() => increment(item.id)}>+</button>
</div>
</div>
<div className="item-total"> ₹ {item.price * item.qty}</div>
</div>))}
<div className="cart-summary">
<h3>Total</h3>
<h3>₹ {getTotalAmount()}</h3>
</div>
<button className="place-order" onClick={handlePlaceOrder}>Place Order</button>


<h2>Enter Your Address:</h2>


<div className="new-address-wrapper">
<input type="text" className="new-address-input" placeholder="Or enter new address" onChange={e => setNewAddress(e.target.value)}/>
<label className="save-address-option">
<input
     type="checkbox"
     checked={saveAddress}
     onChange={(e) => setSaveAddress(e.target.checked)}
   />
   Save this address for future orders
</label>

<div className="address-section"></div>
<h3>Select Delivery Address</h3>
{addresses.map(addr => (
<label key={addr._id} className="address-option">
<input type="radio" name="address" value={addr.addressText}
 checked={selectedAddress === addr.addressText} onChange={() => setSelectedAddress(addr.addressText)}/>
<span>{addr.addressText}</span>
</label>
 ))}
</div>
</div>);
 
  

};

export default Cart;
 
