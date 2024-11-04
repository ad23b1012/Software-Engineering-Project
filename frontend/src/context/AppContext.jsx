import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = ' ₹ ';
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Define the token and setToken state here
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false);
  
  // Define the other states
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  // Function to fetch doctors data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to load user profile data
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + 'api/user/get-profile', { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Values to be shared via context
  const value = {
    token, setToken,           // Added token and setToken to context
    doctors,
    currencySymbol,
    backendUrl,
    userData, setUserData,
    loadUserProfileData
  };

  // Fetch doctors data once on component mount
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Fetch user profile data whenever token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
