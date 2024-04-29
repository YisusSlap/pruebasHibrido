import React from "react";

import {  View,  } from 'react-native';
import Signin from "./Signin";
import { Route, Routes } from "react-router-native";

const Main = () =>{
  return (
    <View>
      
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/signin' element={<Signin/>} />
      </Routes>
    </View>
  )
}

export default Main