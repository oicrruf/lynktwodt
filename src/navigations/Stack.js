import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Login from '../screens/Login';
import Journey from '../screens/Journey';
import Delivery from '../screens/Delivery';
import Detail from '../screens/Detail';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Journey"
        component={Journey}
        options={{
          headerTransparent: true,
          title: false,
        }}
      />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerTransparent: false,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            height: hp(9),
            backgroundColor: '#1F57E5',
          },
          title: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTransparent: false,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            height: hp(9),
            backgroundColor: '#1F57E5',
          },
          title: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
