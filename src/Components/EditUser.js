// EditUser.js
import React, { useState,useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      console.log(`User updated: ${response.data}`);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={user.name} onChange={handleChange} name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={user.email} onChange={handleChange} name="email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={user.phone} onChange={handleChange} name="phone" />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={user.address.street} onChange={(event) => setUser({ ...user, address: { ...user.address, street: event.target.value } })} />
          <input type="text" value={user.address.suite} onChange={(event) => setUser({ ...user, address: { ...user.address, suite: event.target.value } })} />
          <input type="text" value={user.address.city} onChange={(event) => setUser({ ...user, address: { ...user.address, city: event.target.value } })} />
          <input type="text" value={user.address.zipcode} onChange={(event) => setUser({ ...user, address: { ...user.address, zipcode: event.target.value } })} />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;