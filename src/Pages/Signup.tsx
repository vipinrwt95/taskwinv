import React from 'react';
import Form, { FormData } from '../components/form';
import { signUpUser } from '../util/api'; 
import { useDispatch } from 'react-redux'; 
import { setToken } from '../store/authSlice'; 
import { useLocation, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const dispatch = useDispatch(); 
  const Navigate=useNavigate();
  const handleSignUp = async (formData: FormData) => {
    try {
      const token = await signUpUser(formData.username, formData.password);
      
      alert('Sign up successful!');
      console.log(token)
      dispatch(setToken(token?.token))
      Navigate('/dashboard')
    
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-200">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <Form onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default Signup;
