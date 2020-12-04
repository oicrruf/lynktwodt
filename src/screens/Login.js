import React, {useState, useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {axiosRequest} from '../function/Request';
import {access_token, reLogin} from '../function/Realmio';

const Login = ({navigation}) => {
  const [GetUser, setformUser] = useState(false);
  const [GetPass, setformPass] = useState(false);

  useEffect(() => {
    reLogin(navigation);
  }, []);

  const getValue = (value, type = false) => {
    type ? setformUser(value) : setformPass(value);
  };

  const LoginCheck = () => {
    // Formateo la informacion.
    const datalogin = {email: GetUser, password: GetPass};

    // hago login y obtengo el token
    axiosRequest('login', 'post', datalogin)
      .then((resultAxios) => {
        // verifico la info

        if (resultAxios.data) {
          access_token(resultAxios.data);
          // navigation.navigate('Journey');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.containter}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
          </View>
        </View>

        <View style={styles.inputs}>
          <Input
            placeholder="Usuario"
            leftIcon={<Icon name="user" size={24} color="#F7D64B" />}
            onChangeText={(event) => getValue(event, 'user')}
          />
          <Input
            placeholder="Contraseña"
            leftIcon={<Icon name="lock" size={24} color="#F7D64B" />}
            onChangeText={(event) => getValue(event)}
          />
        </View>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title="Ingresar"
            onPress={() => {
              LoginCheck();
            }}
          />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containter: {
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: hp(100) / 3,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
  logoContainer: {
    backgroundColor: '#FFF',
    width: wp(100),
    height: hp(100) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: wp(20),
    borderBottomStartRadius: wp(20),
  },
  logo: {
    backgroundColor: '#FFF',
  },
  inputs: {
    height: hp(100) / 3,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
  buttonContainer: {},
  button: {
    width: wp(90),
  },
  buttonContainer: {
    height: hp(100) / 3,
    width: wp(100),
    alignItems: 'center',
    backgroundColor: '#1F57E5',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Login;
