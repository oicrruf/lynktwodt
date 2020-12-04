import * as React from 'react';
import {Button} from 'react-native-elements';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {cleanLogin} from '../function/Realmio';
import Login from '../screens/Login';
import Journey from '../screens/Journey';
import Delivery from '../screens/Delivery';
import Detail from '../screens/Detail';

const Logo = () => {
  return (
    <Image
      style={{alignSelf: 'center'}}
      source={require('../assets/images/header.png')}
    />
  );
};
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
        headerTitle: (props) => <Logo {...props} />,
        headerRight: () => (
          <Button
            icon={<Icon name="sign-out" size={20} color="#FFFFFF" />}
            onPress={() => {
              console.log('cerrar sesion');
            }}
            color="#1F57E5"
            type="clear"
            buttonStyle={{
              width: hp(6),
              height: hp(6),
              borderRadius: hp(12),
            }}
          />
        ),
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
          headerTransparent: false,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            height: hp(9),
            backgroundColor: '#FFFFFF',
            elevation: 0,
          },
          title: false,
          headerRight: () => (
            <Button
              icon={<Icon name="sign-out" size={20} color="#1F57E5" />}
              onPress={() => {
                console.log('cerrar sesion');
              }}
              color="#1F57E5"
              type="clear"
              buttonStyle={{
                width: hp(6),
                height: hp(6),
                borderRadius: hp(12),
              }}
            />
          ),
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
