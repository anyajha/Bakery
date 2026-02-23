import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import CakeCard from "../components/CakeCard";

import "../styles/categoryPage.css";

export default function CategoryPage() {

  const { category } = useParams();

  const [products, setProducts] = useState([]);

  const decodedCategory = decodeURIComponent(category);

  useEffect(() => {

    fetch(`http://localhost:5000/api/products/category/${decodedCategory}`)

      .then((res) => res.json())

      .then((data) => setProducts(data))

      .catch((err) => console.log(err));

  }, [decodedCategory]);
 
  return (
<div className="category-page">
<h1 className="category-title">{decodedCategory}</h1>
<div className="category-grid">

      {products.map((p) => (
<CakeCard key={p._id} cake={p} />

      ))}
</div>
</div>

);
 
 


}
 
