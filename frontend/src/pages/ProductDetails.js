import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/ProductDetails.css";


function ProductDetails() 
{
  const [product, setProduct]=useState(null);
  const [loading,setLoading]=useState(true);

  const { addToCart} = useCart();
  const navigate = useNavigate();
 
  const { id } = useParams();

  useEffect(() => {

  const fetchProduct = async () => {

    try {

      const res = await fetch(`http://localhost:5000/api/products/${id}`);

       if (!res.ok) {

  throw new Error("Failed to fetch product");

}

const data = await res.json();

console.log("ProductDetails data:", data);

setProduct(data);
 

    } catch (err) {

      console.error("Error fetching product:", err);

    } finally {

      setLoading(false);

    }

  };

  fetchProduct();

}, [id]);

const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back(); // or window.history.go(-1)
    } else {
      // Optional: fallback route when no history
      window.location.href = "/"; 
    }
  }








 
  if(loading) return <p>Loading...</p>;
  if (!product) return <h2>Product not found</h2>;

  return (
<>

<div className="product-page">
  
<div className="product-container">
<button className="back-button" onClick={handleBack}>
  ← Back
</button>

{/* LEFT IMAGE */}
<div className="product-image">
<img src={product.image} alt={product.name} />
</div>


{/* RIGHT DETAILS */}
<div className="product-info">
<h1>{product.name}</h1>
<p className="price">₹ {product.price}</p>
<p className="description">{product.description}</p>
<div className="actions">
<button className="buy-btn" onClick={()=>{addToCart(product); navigate("/cart")}}>Buy Now</button>
<button className="cart-btn" onClick={()=> addToCart(product)}>Add to Cart</button>
</div>
</div>
</div>
</div></>);

}

export default ProductDetails;
 
