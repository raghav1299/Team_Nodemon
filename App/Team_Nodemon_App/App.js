import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigators } from "./src/Navigation/HomeNavigators/HomeStackNavigators"




export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigators />
    </NavigationContainer>
  );
}