import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Home: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(prevState => !prevState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
  <button onClick={toggleForm} className="text-blue-500 font-semibold mb-4">
    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
  </button>
  {isSignUp ? <Signup /> : <Signin />}
</div>

    </div>
  );
};

export default Home;
