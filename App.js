import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScanScreen from './Screens/ScanScreen'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class App extends React.Component{
  render(){
  return (
    <AppContainer/>
  );
}
}
const TabNavigator = createBottomTabNavigator({
  ScanScreen: {screen : ScanScreen},
},{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName
      if(routeName === 'ScanScreen'){
        return(
          <Image source = {require("./assets/camera.jpg")}
          style = {{width:30,height:30}}/>
        )
      }
    }
  })
})
const AppContainer = createAppContainer(TabNavigator)

