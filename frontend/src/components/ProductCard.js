export default function ProductCard({ products }) {

  return (
<div className="card">
<img src={products.img} alt={products.name} />
<h3>{products.name}</h3>
<p>₹ {products.price}</p>
<button>BUY NOW</button>
</div>

  );

}
 
