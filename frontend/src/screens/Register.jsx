// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  function submitHandler(e){
    e.preventDefault();
    axios.post('/users/register',{
        email,
        password
    }).then((res)=>{
        console.log(res.data);
        navigate('/');
    }).catch((error)=>{
        console.log(error.response.data);
    });
  } 


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl shadow-gray-900/50 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;