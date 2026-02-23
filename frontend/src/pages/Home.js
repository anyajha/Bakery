import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import HorizontalRow from "../components/HorizontalRow";

import Hero from "../components/Hero";

import Carousel from "../components/Carousel";

import Categories from "../components/Categories";

export default function Home({ searchTerm = "" }) {

  const navigate = useNavigate(); // ✅ FIXED (was missing)


  const [products, setProducts] = useState([]);

  const [seeAllCategory, setSeeAllCategory] = useState(null);

  const [loading, setLoading] = useState(true);

  const [dark, setDark] = useState(false);

  /* ------------------ DARK MODE ------------------ */

  useEffect(() => {

    document.body.classList.toggle("dark", dark);

  }, [dark]);

  /* ------------------ FETCH PRODUCTS ------------------ */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/products");

        const data = await res.json();

        console.log("Backend products:", data);

        setProducts(data);

      } catch (err) {

        console.error("Fetch error:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);



  


  /* ------------------HANDLE SEE ALL------------------ */

const handleSeeAll = (category) => {

  navigate(`/category/${encodeURIComponent(category)}`);

};
 



  /* ------------------ SEARCH ------------------ */

  const filteredProducts = products.filter((p) =>

    p.name.toLowerCase().includes(searchTerm.toLowerCase())

  );

  const isSearching = searchTerm.trim() !== "";

  /* ------------------ CATEGORY FILTER ------------------ */

 const byCategory = (cat) =>

  products

    .filter(

      (p) => p.category?.toLowerCase() === cat.toLowerCase()

    )

    .sort((a, b) => {

      if (!a.createdAt) return 1;

      if (!b.createdAt) return -1;

      return new Date(b.createdAt) - new Date(a.createdAt);

    });
 

  if (loading)

    return <p style={{ textAlign: "center" }}>Loading cakes...</p>;

  return (
<>
<Hero />
<Categories />
<Carousel />

      {/* 🔍 SEARCH RESULTS */}

      {isSearching ? (
<HorizontalRow

          title={`Search Results for "${searchTerm}"`}

          cakes={filteredProducts}

        />

      ) : (
<>

          {/* 🎂 BIRTHDAY CAKES */}
<HorizontalRow

            id="Birthday Cakes"

            title="Birthday Cakes"

            cakes={byCategory("Birthday Cakes").slice(0, 5)}

            category="Birthday Cakes"

            onSeeAll={handleSeeAll}

          />

          {/* 💍 ANNIVERSARY CAKES */}
<HorizontalRow

            id="Anniversary Cakes"

            title="Anniversary Cakes"

            cakes={byCategory("Anniversary Cakes").slice(0, 5)}

            category="Anniversary Cakes"

            onSeeAll={handleSeeAll}

          />

          {/* 🧁 CUPCAKES */}
<HorizontalRow

            id="Cupcakes"

            title="Cupcakes"

            cakes={byCategory("Cupcakes").slice(0, 5)}

            category="Cupcakes"

            onSeeAll={handleSeeAll}

          />

          {/* 🥐 PASTRIES */}
<HorizontalRow

            id="Pastries"

            title="Pastries"

            cakes={byCategory("pastries").slice(0, 5)}

            category="pastries"

            onSeeAll={handleSeeAll}

          />

          {/* 👀 SEE ALL SECTION */}

          {seeAllCategory && (
<div id="see-all">
<HorizontalRow

                title={`All ${seeAllCategory} Cakes`}

                cakes={byCategory(seeAllCategory)}

              />
</div>

          )}
</>

      )}
</>

  );

}
 
