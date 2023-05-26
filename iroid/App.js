import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/signIn';
import Dashboard from './screens/Dasboard';
const Stack= createNativeStackNavigator();
export default function App() {
  React.useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    },1000)
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
      headerShown: false
      }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}