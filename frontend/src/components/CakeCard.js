import { useNavigate } from "react-router-dom";

import "../styles/cakeCard.css";

import { useCart } from "../context/CartContext";

export default function CakeCard({ cake }) {
  const { name, price, image, description}=cake;

  const isNew = (createdAt) => {

  if (!createdAt) return false;

  const created = new Date(createdAt);

  const now = new Date();

  const diffDays = (now - created) / (1000 * 60 * 60 * 24);

  return diffDays <= 7;

};
 

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const handleView = (e) => {

    e.stopPropagation();

    navigate(`/product/${cake._id}`);
    console.log(cake);

  };

  const handleAdd = (e) => {

    e.stopPropagation();

    addToCart(cake);

  };

  if(!cake) return null;

  return (
<div className="cake-card">

   {isNew(cake.createdAt) && <span className="new-badge">NEW</span>}
<img src={cake.image} alt={cake.name} className="cake-image" />
<h3>{cake.name}</h3>
<p>₹ {cake.price}</p>
<div className="cake-actions">
<button onClick={handleView}>View</button>
<button onClick={handleAdd}>Add</button>
</div>
</div>

  );

}
 
