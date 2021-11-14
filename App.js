import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { SaveScreen } from './screens/SaveScreen'
import { YoutubeScreen } from './screens/YoutubeScreen';

export default function App() {
  
  const Tap = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tap.Navigator>
        <Tap.Screen
          name="Home"
          options={{
            tabBarIcon:()=>(<AntDesign name="home" size={24} color="black" />)
          }}
          component={HomeScreen}
        ></Tap.Screen>
        <Tap.Screen
          name="Saved"
          options={{
            tabBarIcon:()=>(<AntDesign name="home" size={24} color="black" />)
          }}
          component={SaveScreen}
        ></Tap.Screen>
        <Tap.Screen
          name="Youtube"
          options={{
            tabBarIcon:()=>(<AntDesign name="home" size={24} color="black" />)
          }}
          component={YoutubeScreen}
        ></Tap.Screen>
      </Tap.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
