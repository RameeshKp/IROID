import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../assets/images/home.png';
import Meals from '../assets/images/meals.png';
import Profile from '../assets/images/profile.png';
import More from '../assets/images/more.png';

import MealsScreen from './MealsScreen';
import HomeScreen from './HomeScreen';
import MoreScreen from './MoreScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  const getTabBarIcon = (name) => {
    let icon;
    switch (name) {
      case 'Home':
        icon = Home;
        break;
      case 'Meals':
        icon = Meals;
        break;
      case 'Profile':
        icon = Profile;
        break;
      case 'More':
        icon = More;
        break;
    }
    return icon;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 55,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              style={{
                width: 18,
                height: 18,
                tintColor: focused ? '#3BB0EC' : '#949494',
                resizeMode: 'contain',
              }}
              source={getTabBarIcon(route?.name)}
            />
          );
        },
        tabBarActiveTintColor: '#3BB0EC',
        tabBarInactiveTintColor: '#949494',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meals" component={MealsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
