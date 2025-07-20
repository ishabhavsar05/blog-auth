import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3030/api/user/register", formData);
      alert(res.data.message || "Registered successfully");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 -5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 ">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" style={{marginLeft:"300px"}}>
          <input
            className="form-control w-75 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          /> <br /><br />
          <input
            className="form-control w-75 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          /><br /><br />
          <input
            className="form-control w-75 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          /><br /><br />
          <button
            type="submit"
            className="form-control w-75 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button><br /><br />
          
        </form>
        <p className="text-center  text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login here
            </span>
          </p><br /><br />
      </div>
    </div>
  );
};

export default RegisterForm;
