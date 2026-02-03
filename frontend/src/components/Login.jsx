import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/api/auth/v1/user/login', formData, { 
        withCredentials: true 
      });
      console.log('Success:', res.data);
      navigate('/dashboard');
      alert('Login successful!');

      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-center text-sm sm:text-base text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
