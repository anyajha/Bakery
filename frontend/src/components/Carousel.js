import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import "../styles/carousel.css";

export default function Carousel() {

  const settings = {

    dots: true,

    infinite: true,

    speed: 700,

    slidesToShow: 1,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 3000,

  };

  return (
<div className="carousel-container">
<Slider {...settings}>
<div className="slide slide1">
<img src="\images\Image (1).jpg" alt="cupcake"/>
<div className="overlay">
<h1>45-Minute Cake Delivery</h1>
<p>Where artisanal baking meets modern flavours. Thoughtfully made, elegantly delivered.
 </p>
</div>
</div>


<div className="slide slide2">
  <img src="images\Image (2).jpg" alt="red"/>
<div className="overlay">
<h1>Red Velvet Cheese Cakes</h1>
<p>Beacuse calories don't count when it's freshly baked.</p>
</div>
</div>



<div className="slide slide3">
    <img src="\images\Image.jpg" alt="cookie"/>
<div className="overlay">
<h1>Designer Birthday Cakes</h1>
<p>From birthdays to “just because” moments — we bake joy into every slice.</p>
</div>
</div>
</Slider>
</div>

  );

}
 
