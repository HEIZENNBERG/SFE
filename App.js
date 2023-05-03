// App.js
import * as React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';
import Signup from './components/signup';
import MainHse from './components/HSE/MainHse';
import { EmpTabs } from './components/employee/EmpTabs';

const Stack = createStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      >
      <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{ headerShown: false }}  
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
        <Stack.Screen 
        name="MainHse" 
        component={MainHse}
        options={{ headerShown: false }}  
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar hidden={false} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmpTabs"
            component={EmpTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
