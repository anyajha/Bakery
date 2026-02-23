import { useEffect, useState } from "react";

import "../styles/admin.css";



export default function Admin() {
  const token = localStorage.getItem("token");

  const [active, setActive] = useState("dashboard");

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [editId, setEditId] = useState(null);

  const [recentAdded, setRecentAdded] = useState(() => {

    const saved = localStorage.getItem("recentlyAdded");

    return saved ? JSON.parse(saved) : [];

  });

  const [form, setForm] = useState({

    name: "",

    price: "",

    category: "",

    image: "",

    description:"",

    status: "available",

  });

  const categories = [

    "Birthday Cakes",

    "Anniversary Cakes",

    "Cupcakes",

    "Pastries",

  ];

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/products", {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(data);

    } catch (err) {

      console.error(err);

    }

  };

  /* ================= FETCH ORDERS ================= */

 
 const fetchOrders = async () => {

  try {

    const res = await fetch("http://localhost:5000/api/orders/all");

    const data = await res.json();

    console.log("ALL ORDERS 👉", data);

    setOrders(data);

  } catch (err) {

    console.error("Error fetching orders", err);

  }

};

  useEffect(() => {

    localStorage.setItem("recentlyAdded", JSON.stringify(recentAdded));

    fetchProducts();

    fetchOrders();

  }, [recentAdded]);

  /* ================= DASHBOARD CALCS ================= */
const totalOrders = orders.length;

const totalItemsSold = orders.reduce((sum, o) => {

  return (

    sum +

    o.items.reduce((s, item) => s + (item.qty || 1), 0)

  );

}, 0);

const totalRevenue = orders.reduce(

  (sum, o) => sum + (o.total || 0),

  0

);
 
  /* ================= EDIT ================= */

  const handleEdit = (p) => {

    setForm({

      name: p.name,

      price: p.price,

      category: p.category,

      description:p.description,

      image: p.image,

      status: p.status,

    });

    setEditId(p._id);

    setActive("add");

  };

  /* ================= ADD / UPDATE ================= */




  
 
  const handleAdd = async (e) => {

    e.preventDefault();
    if (!token) {

  alert("Session expired. Please login again.");

  return;

}

    try {

      let res;

      let data;

      if (editId) {

        // UPDATE

        res = await fetch(

          `http://localhost:5000/api/products/${editId}`,

          {

            method: "PUT",

            headers: {

              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(form),

          }

        );

      } else {

        // ADD


        res = await fetch("http://localhost:5000/api/products", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,

          },

          body: JSON.stringify(form),

        });

      }

      data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (editId) {

        // replace updated in recent

        setRecentAdded((prev) =>

          prev.map((i) => (i._id === editId ? data : i))

        );

      } else {

        setRecentAdded((prev) => [data, ...prev]);

      }

      alert(editId ? "Product updated!" : "Product added!");

      setForm({

        name: "",

        price: "",

        category: "",

        image: "",

        description:"",

        status: "available",

      });

      setEditId(null);

      fetchProducts();

    } catch (err) {

      console.error(err);

      alert("Server error");

    }

  };

  /* ================= DELETE ================= */

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await fetch(`http://localhost:5000/api/products/${id}`, {

        method: "DELETE",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      fetchProducts();

    } catch (err) {

      console.error(err);

    }

  };

  const grouped = products.reduce((acc, p) => {

    acc[p.category] = acc[p.category] || [];

    acc[p.category].push(p);

    return acc;

  }, {});

  /* ================= UI ================= */

  return (
<div className="admin-layout">
<aside className="admin-sidebar">
<h2>CakeSquare</h2>
<button

          className={active === "dashboard" ? "active" : ""}

          onClick={() => setActive("dashboard")}
>

          Dashboard
</button>
<button

          className={active === "products" ? "active" : ""}

          onClick={() => setActive("products")}
>

          Products
</button>
<button

          className={active === "add" ? "active" : ""}

          onClick={() => setActive("add")}
>

          Add Product
</button>
<button

          className="logout-btn"

          onClick={() => {

            localStorage.clear();

            window.location.href = "/login";

          }}
>

          Logout
</button>
</aside>
<main className="admin-main">

        {/* DASHBOARD */}

        {active === "dashboard" && (
<>
<h2>Dashboard</h2>
<div className="dash-grid">
<div className="dash-card">
<h4>Total Products</h4>
<p>{products.length}</p>
</div>
<div className="dash-card">
<h4>Items Sold</h4>
<p>{totalItemsSold}</p>
</div>
<div className="dash-card">
<h4>Revenue</h4>
<p>₹{totalRevenue}</p>
</div>
<div className="dash-card">
<h4>Total Orders</h4>
<p>{totalOrders}</p>
</div>
</div>
</>

        )}

        {/* PRODUCTS */}

        {active === "products" && (
<>
<h2>Products</h2>
<h3>Recently Added</h3>

            {recentAdded.map((p) => (
<div key={p._id} className="recent-card">
<img src={p.image} alt={p.name} width="40" />
<span>{p.name}</span> 
<span> price: ₹{p.price}</span>
<span> description: {p.description}</span>
<span> category: {p.category}</span>
</div>

            ))}

            {Object.keys(grouped).map((cat) => (
<div key={cat}>
<h3>{cat}</h3>

                {grouped[cat].map((p) => (
<div key={p._id} className="admin-row">
<img src={p.image} alt={p.name} width="40" />
<span>{p.name}</span>
<span>₹{p.price}</span>
<button className="admin-update-btn" onClick={() => handleEdit(p)}>Update</button>
<button className="admin-delete-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
</div>

                ))}
</div>

            ))}
</>

        )}

        {/* ADD / UPDATE */}

        {active === "add" && (
<>
<h2>{editId ? "Update Product" : "Add Product"}</h2>
<form onSubmit={handleAdd} className="admin-form">
<input

                placeholder="Name"

                value={form.name}

                onChange={(e) =>

                  setForm({ ...form, name: e.target.value })

                }

              />



              <input

                placeholder="Description"

                value={form.description}

                onChange={(e) =>

                  setForm({ ...form, description: e.target.value })

                }

              />




<input

                placeholder="Price"

                value={form.price}

                onChange={(e) =>

                  setForm({ ...form, price: e.target.value })

                }

              />
<select

                value={form.category}

                onChange={(e) =>

                  setForm({ ...form, category: e.target.value })

                }
>
<option value="">Select Category</option>

                {categories.map((c) => (
<option key={c} value={c}>

                    {c}
</option>

                ))}
</select>
<input

                placeholder="Image URL"

                value={form.image}

                onChange={(e) =>

                  setForm({ ...form, image: e.target.value })

                }

              />
<button type="submit">

                {editId ? "Update" : "Add"}
</button>
</form>
</>

        )}
</main>
</div>

  );

}
 
