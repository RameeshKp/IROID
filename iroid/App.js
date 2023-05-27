import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/signIn';
import Dashboard from './screens/Dasboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthenticatedStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
function MainStack() {
  return (
    <AuthenticatedStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <AuthenticatedStack.Screen name="Dashboard" component={Dashboard} />
      <AuthenticatedStack.Screen name="SignIn" component={SignIn}/>
    </AuthenticatedStack.Navigator>
  );
}

function NormalStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
     <AuthenticatedStack.Screen name="SignIn" component={SignIn}/>
     <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [hasToken, setHasToken] = React.useState('');

  React.useEffect(() => {
    setTimeout(
      async() => {
      const token = await AsyncStorage.getItem('TOKEN');
      setHasToken(!!token);
      SplashScreen.hide();
    }, 0);
  }, []);

  return (
    <NavigationContainer>
      {hasToken!==''&&<Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {hasToken ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="NormalStack" component={NormalStack} />
        )}
      </Stack.Navigator>}
    </NavigationContainer>
  );
}
