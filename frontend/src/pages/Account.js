import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/account.css";

const Account = () => {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user) return;

    fetch(`http://localhost:5000/api/orders/${user.email}`)

      .then((res) => res.json())

      .then((data) => {

        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        console.log(data);
        setLoading(false);

      })
      .catch(()=> setLoading(false));

  }, [user.email]);

  const navigate = useNavigate();

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
<div className="account-page">
<h2>My Orders</h2>
      {orders.length === 0 ? (
<p>No orders yet.</p>

      ) : (

        orders.map((order) => (
<div className="order-card" key={order._id}>
<div className="order-header">
<span>Order #{order._id.slice(-6)}</span>
<span>

                {new Date(order.createdAt).toLocaleDateString()}
</span>
</div>

            {order.items.map((item) => (
<div className="order-item" key={item.id}>
<img src={item.image} alt={item.name} />
<div>
<h4>{item.name}</h4>
<p>₹{item.price} x {item.qty}</p>
<p className="order-address">{order.address}</p>
</div>
</div>))}
<div className="order-total">Total: ₹{order.total}
</div>
</div>

        ))

      )}
</div>

  );

};

export default Account;
 
