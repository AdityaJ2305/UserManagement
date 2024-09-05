import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';

const User = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}</p>
      <Link to={`/edit-user/${id}`}>Edit</Link>
    </div>
  );
};

export default User;
