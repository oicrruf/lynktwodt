import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Journey from '../screens/Journey';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
