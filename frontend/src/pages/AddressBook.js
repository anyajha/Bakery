import { useEffect, useState } from "react";

import axios from "axios";

export default function AddressBook() {

  const email = localStorage.getItem("email");

  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {

    axios.get(`http://localhost:5000/api/addresses/${email}`)

      .then(res => setAddresses(res.data));

  }, [email]);

  const addAddress = async () => {

    await axios.post("http://localhost:5000/api/addresses/add", {

      email,

      addressText: newAddress,

      label: "Home",

      isDefault: addresses.length === 0

    });

    setNewAddress("");

    const res = await axios.get(`http://localhost:5000/api/addresses/${email}`);

    setAddresses(res.data);

  };

  return (
<div className="address-book">
<h2>My Addresses</h2>

      {addresses.map(addr => (
<div key={addr._id}>
<strong>{addr.label}</strong> — {addr.addressText}

          {addr.isDefault && <span> (Default)</span>}
</div>

      ))}
<textarea

        value={newAddress}

        onChange={e => setNewAddress(e.target.value)}

        placeholder="Enter new address"

      />
<button onClick={addAddress}>Save Address</button>
</div>

  );

}
 
