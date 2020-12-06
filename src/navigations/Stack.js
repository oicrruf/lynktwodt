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
      style={{alignSelf: 'center',marginLeft:70}}
      source={require('../assets/images/header.png')}
    />
  );
};
const Stack = createStackNavigator();

const LoginStackNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
          },
          headerTitle: (props) => <Logo {...props} />,
          headerRight: () => (
            <Button
              icon={<Icon name="sign-out" size={hp(3)} color="#FFFFFF" />}
              onPress={() => {
                 cleanLogin(navigation);
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
        name="Journey"
        component={JourneyStackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Delivery"
        component={JourneyStackNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const JourneyStackNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Journey">
      <Stack.Screen
        name="Journey"
        component={Journey}
        options={{
          headerLetf: false,
          headerShown: true,
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
              icon={<Icon name="sign-out" size={hp(3)} color="#1F57E5" />}
              onPress={() => {
                cleanLogin(navigation);
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
        component={DeliveryStackNavigation}
        options={{
          headerTransparent: false,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            height: hp(9),
            backgroundColor: '#1F57E5',
          },
          title: false,
          headerTitle: (props) => <Logo {...props} />,
          headerRight: () => (
            <Button
              icon={<Icon name="sign-out" size={hp(3)} color="#FFFFFF" />}
              onPress={() => {
                 cleanLogin(navigation);
              }}
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
    </Stack.Navigator>
  );
};

const DeliveryStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Delivery">
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailStackNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DetailStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Detail"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Delivery" component={Delivery} />
    </Stack.Navigator>
  );
};

export {LoginStackNavigation};
