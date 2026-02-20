import "../styles/footer.css";
export default function Footer() {
 return (
<footer className="footer">
<div className="footer-top">
       {/* Left: Logo + Social */}
<div className="footer-brand">
<h2 className="brand">CakeSquare</h2>
<p className="tagline">Where cake Becomes Art</p>
<div className="socials">
<i className="fab fa-facebook-f"></i>
<i className="fab fa-instagram"></i>
<i className="fab fa-youtube"></i>
<i className="fab fa-x-twitter"></i>
</div>
</div>
       {/* Links */}
<div className="footer-links">
<div>
<h4>Collections</h4>
<ul>
<li>Chocolate Covered Strawberry Boxes</li>
<li>Chocolate Covered Fruit Bouquets</li>
<li>Fresh Fruit Bouquets</li>
<li>Fruit Baskets</li>
<li>Fruit Cakes</li>
<li>Dry Fruit Hampers</li>
<li>Gifts In Mumbai</li>
</ul>
</div>
<div>
<h4>More Ways to Celebrate</h4>
<ul>
<li>Fruit Platters</li>
<li>Fruit Towers</li>
<li>Personalised Balloon Hampers</li>
<li>Signature Juice Hampers</li>
<li>Sweet Deals</li>
<li>Events</li>
<li>Send Fresh Fruits to Mumbai</li>
</ul>
</div>
<div>
<h4>Customer Service</h4>
<ul>
<li>Privacy Policy</li>
<li>Terms of Service</li>
<li>Shipping Policy</li>
<li>Refund Policy</li>
<li>Allergy Warnings</li>
<li>FAQs</li>
<li>Blogs</li>
<li>About Us</li>
<li>Contact Us</li>
</ul>
</div>
</div>
</div>
<div className="footer-bottom">
       © 2025. CakeSquare.in Designed by Anya Jha
</div>
</footer>
 );
}
