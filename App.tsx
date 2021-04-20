import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Welcome } from "./src/pages/Welcome";
import AppLoading from "expo-app-loading";

import {useFonts,
        Jost_400Regular,
        Jost_600SemiBold  
} from "@expo-google-fonts/jost"


export default function App() {
  const[fontsLoaded] = useFonts({Jost_400Regular, Jost_600SemiBold})
  
if(!fontsLoaded)
    return<AppLoading/>

  return (
    <Welcome/>
  )
}
