import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { dummyCarData } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);

  // 🔥 Fetch user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data');

      if (data?.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🔥 FINAL FIXED fetchCars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get('/api/user/cars');

      console.log("API RESPONSE:", data);

      // ✅ IMPORTANT FIX (length check)
      if (data?.success && data?.cars?.length > 0) {
        setCars(data.cars);
      } else {
        setCars(dummyCarData); // 🔥 fallback when empty
      }

    } catch (error) {
      console.log("API ERROR:", error);
      setCars(dummyCarData); // 🔥 fallback on error
      toast.error("Using dummy data (API failed)");
    }
  };

  // 🔥 Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization'] = '';
    toast.success('You have been logged out');
  };

  // 🔥 Initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    fetchCars(); // ✅ always fetch cars
  }, []);

  // 🔥 Fetch user if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchCars,
    cars,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};