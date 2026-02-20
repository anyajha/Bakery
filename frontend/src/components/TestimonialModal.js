
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/testimonial.css";



const TestimonialModal=({
    setShowReviewForm,
    setShowSuccessModal, clearCart}) =>{
     const [rating,setRating]=useState(0);
     const navigate = useNavigate();


  return (
    
<div className="testimonial-overlay">
<div className="testimonial-card">
<p className="testimonial-title">Order Confirmed!</p>
<div className="quote-circle">“</div>
<div className="testimonial-box">
<p className="testimonial-text">Thank you for choosing CakeSquare!<br /> You will receive your order shortly.         
</p>
<hr/>
<p className="testimonial-name">With Love, CakeSquare</p>
</div>
<div className="stars">

  {[1, 2, 3, 4, 5].map((star) => (
<span

      key={star}

      className={star <= rating ? "star filled" : "star"}

      onClick={() => setRating(star)}
>

      ★
</span>

  ))}
</div>
 
<button
    className="review-btn"
    onClick={() => {
    setShowSuccessModal(false);
    navigate("/account")
    setShowReviewForm(true);
    clearCart();

  }}
>
 Submit
</button>
 
</div>
</div>

  );

}
 
export default TestimonialModal;
