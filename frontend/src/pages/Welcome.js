import React from "react";
import Hero from "../components/Hero";

import Carousel from "../components/Carousel";

import Categories from "../components/Categories";

 
import { useNavigate } from "react-router-dom";

import "../styles/welcome.css";

const Welcome = () => {

  const navigate = useNavigate();

  return (
    <>
    <Hero />
<div className="welcome-wrapper">
<div className="welcome-card">

        {/* LEFT TEXT */}
<div className="welcome-left">
<div className="logo"><bold>CakeSquare</bold></div>
<p className="new-flavor">NEW FLAVORS</p>
<h1 className="title">BAKERY<br /> CORNER</h1>

<p className="timing">OPENS DAILY :<br /> <strong>9:00 - 22:00 </strong></p>
<p className="tagline">“We offer every independent day”</p>
<button className="order-btn" onClick={() => navigate("/login")}>Order Now →
</button>
</div>
<div className="new-stack">
<span>NEW</span>
<span>NEW</span>
<span>NEW</span>
<span>NEW</span>
</div>



        {/* RIGHT IMAGE */}
<div className="welcome-right">
<div className="circle-back"></div>
<div className="circle-front">
<span className="circle-text">MACROONS</span>
</div>
<img src="\images\newWel.png"alt="macaron"className="macaron-img"/>
</div>
</div>
</div>



<Categories />
<Carousel />
</>

  );

};

export default Welcome;
 
