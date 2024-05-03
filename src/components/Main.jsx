//import React from "react";

import {  View,  } from 'react-native';
import React, { useEffect } from "react";
import Signin from "./Signin";
import {Route, Routes, useNavigate} from "react-router-native";
import WelcomeScreen from './WelcomeScreen';
import { isAuthenticated } from './AuthService';

const Main = () =>{

    const navigate = useNavigate();

    React.useEffect(() => {
        const checkAuthentication = async () => {
            const isAuth = await isAuthenticated();
            if (isAuth) {
                navigate('/welcome');
            }
        };
        checkAuthentication();
    }, [navigate]);

  return (
    <View>
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/signin' element={<Signin/>} />
          <Route path="/welcome" element={<WelcomeScreen />} />
      </Routes>
    </View>
  )
}

export default Main