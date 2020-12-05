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
        console.log(resultAxios.data.errors);
        // verifico la info
        if (resultAxios.data.errors) {
          alert(resultAxios.data.message);

        }else{
            access_token(resultAxios.data);
           navigation.navigate('Journey');
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
          <ImageBackground
            source={require('../assets/images/bg-header.png')}
            style={styles.buttonContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
          </ImageBackground>
        </View>
        <View style={styles.inputs}>
          <Input
            placeholder="Usuario"
            inputStyle={styles.textInputs}
            inputContainerStyle={styles.containerInputs}
            leftIcon={<Icon name="user" size={hp(2.5)} color="#F7D64B" />}
            onChangeText={(event) => getValue(event, 'user')}
          />
          <Input
            placeholder="Contraseña"
            inputStyle={styles.textInputs}
            inputContainerStyle={styles.containerInputs}
            leftIcon={<Icon name="lock" size={hp(2.5)} color="#F7D64B" />}
            onChangeText={(event) => getValue(event)}
            secureTextEntry={true}
          />
        </View>
        <ImageBackground
          source={require('../assets/images/bg-footer.png')}
          style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
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
    backgroundColor: '#1F57E5',
  },
  header: {
    height: hp(100) / 3,
    width: wp(100),
    alignItems: 'flex-end',
    backgroundColor: '#1F57E5',
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    height: hp(100) / 3,
    width: wp(100),
    alignItems: 'center',
    backgroundColor: '#1F57E5',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: '#FFF',
    width: wp(100),
    height: hp(100) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: wp(40),
    borderBottomStartRadius: wp(40),
  },
  logo: {
    marginBottom: hp(7),
  },
  inputs: {
    height: hp(100) / 3,
    width: wp(95),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
  textInputs: {
    color: '#FFF',
    fontSize: hp(2.5),
    fontFamily: 'Poppins-Regular',
  },
  containerInputs: {borderBottomColor: '#FFFFFF'},
  button: {
    width: wp(90),
    backgroundColor: '#FFF',
  },
  textButton: {
    color: '#1F57E5',
    textTransform: 'uppercase',
    fontSize: hp(2.5),
    fontFamily: 'Poppins-Bold',
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
