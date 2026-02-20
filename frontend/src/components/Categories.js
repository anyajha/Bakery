import { useNavigate } from "react-router-dom";

import "../styles/categories.css";

const categories = [

  { key: "Birthday Cakes", name: "Birthday Cakes", img: "/images/bd.jpg" },

  { key: "Anniversary Cakes", name: "Anniversary Cakes", img: "/images/an.jpg" },

  { key: "Cupcakes", name: "Cup Cakes", img: "/images/cupcake.jpg" },

  { key: "Pastries", name: "Pastries Cakes", img:"/images/pastry.jpg" },

];
export default function Categories() {

  const handleScroll = (key) => {

    const el = document.getElementById(key);

    console.log("Scrolling to:", key, el); // debug

    if (el) {

      el.scrollIntoView({ behavior: "smooth", block: "start" });

    }

  };

  return (
<div className="categories">
<h2>What’s The Occasion?</h2>
<div className="category-grid">

        {categories.map((cat) => (
<div

            key={cat.key}

            className="category-card"

            onClick={() => handleScroll(cat.key)}
>
<div className="category-img-wrap">
<img src={cat.img} alt={cat.name} />
</div>
<p>{cat.name}</p>
</div>

        ))}
</div>
</div>

  );

}
 
