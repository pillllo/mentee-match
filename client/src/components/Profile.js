import React, { useEffect, useState } from 'react';
import ApiService from './../ApiService';
const initialState = {
  firstName: '',
  lastName: '',
};

const Profile = () => {
  const [state, setState] = useState(initialState);

  const firstName = state.firstName || 'Missing';

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await ApiService.profileMentor();
      if (userInfo) {
        const { firstName } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            firstName,
          };
        });
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile();
  }, []);
  console.log('🎯 Name', firstName);

  return (
    <div>
      <h2>My Profile</h2>
      <h3>Welcome back, {firstName}! Everything is fine.</h3>
    </div>
  );
};

export default Profile;
