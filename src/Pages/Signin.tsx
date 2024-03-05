import React from 'react';
import Form, { FormData } from '../components/form'; 
import { authenticateUser } from '../util/api';
import { useDispatch } from 'react-redux'; 
import { setToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const dispatch=useDispatch();
    const Navigate=useNavigate();
  const handleSignIn = async (formData: FormData) => { 
    
    try {
      const token = await authenticateUser(formData.username, formData.password);
      console.log('Authentication successful. Token:', token);
      dispatch(setToken(token))
      Navigate('/dashboard')
      
    } catch (error) {
      console.error('Authentication failed:');
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-200">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <Form onSubmit={handleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;
