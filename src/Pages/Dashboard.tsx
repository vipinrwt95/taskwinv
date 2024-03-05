import React, { useState, useEffect } from 'react';
import { getUserData } from '../util/api';
import { UserData } from '../util/types';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/authSlice'; 
import { useLocation, useNavigate } from "react-router-dom";


const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const Navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserData = await getUserData();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
    const handleLogout = () => {
       
        dispatch(clearToken());
        Navigate('/home');
      
    console.log('Logged out');
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600">Error: {error}</p>;
  }

  if (!userData) {
    return <p className="text-center mt-8">No user data available</p>;
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === userData.data.length - 1 ? 0 : currentSlide + 1);
    setShowModal(false); 
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? userData.data.length - 1 : currentSlide - 1);
    setShowModal(false); 
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hobbies = ['Reading', 'Traveling', 'Gardening', 'Cooking', 'Photography'];

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center relative">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to the Dashboard</h1>
      <div className="absolute top-0 right-0 m-8">
        <button onClick={handleLogout} className="text-white text-sm bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg shadow-md focus:outline-none transition duration-300">
          Logout
        </button>
      </div>
      <div className="relative w-full max-w-lg overflow-hidden">
        <button className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 focus:outline-none" onClick={prevSlide}>
          <svg className="h-12 w-12 text-white hover:text-gray-300 transition duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 6.5L8 14l7.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 focus:outline-none" onClick={nextSlide}>
          <svg className="h-12 w-12 text-white hover:text-gray-300 transition duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 6.5L16 14l-7.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {userData.data.map((user, index) => (
            <div key={user.id} className="flex-shrink-0 w-full h-full flex justify-center items-center px-4">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 transform hover:scale-105 relative">
                <img className="w-48 h-48 rounded-full mb-4 mx-auto transform transition duration-300 hover:rotate-3" src={user.avatar} alt={`Avatar for ${user.first_name}`} />
                <p className="text-2xl font-bold text-gray-800 mb-2">{user.first_name} {user.last_name}</p>
                <p className="text-gray-600">{user.email}</p>
                <div className="absolute inset-0 bg-black bg-opacity-50 hidden transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 z-20 flex justify-center items-center" onMouseEnter={openModal} onMouseLeave={closeModal}>
                  <div className="bg-white rounded-lg p-8 shadow-lg">
                    <p className="text-lg font-bold text-gray-800 mb-4">Basic Info</p>
                    <div>
                      {/* <p><strong>Age:</strong> {user.age}</p>
                      <p><strong>Gender:</strong> {user.gender}</p>
                      <p><strong>Location:</strong> {user.location}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
