import CakeCard from "./CakeCard";

import "../styles/horizontalRow.css";



export default function HorizontalRow({ id, title, cakes = [], onSeeAll, category }) {

  const normalize = (str) =>

    str?.toLowerCase().replace(/\s+/g, "").trim();

  const filteredCakes = cakes.filter(

    (cake) => normalize(cake.category) === normalize(title)

  );

  if (filteredCakes.length === 0) return null;

  return (
<section id={id}  className="horizontal-section">
<div className="row-header">
<h2>{title}</h2>{onSeeAll && (
<span className="see-all" onClick={() => onSeeAll(title)}>See All
</span>)}
</div>
<div className="horizontal-scroll">

        {filteredCakes.map((cake) => (
<div className="scroll-item" key={cake._id}>
<CakeCard cake={cake} />
</div>

        ))}
</div>
</section>

  );

}
