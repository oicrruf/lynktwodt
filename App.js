import React from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const App = () => {
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('./src/assets/images/logo.png')}
            />
          </View>
        </View>
        <View style={styles.inputs}>
          <Input
            placeholder="Usuario"
            leftIcon={<Icon name="user" size={24} color="#F7D64B" />}
          />
          <Input
            placeholder="Contraseña"
            leftIcon={<Icon name="lock" size={24} color="#F7D64B" />}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button buttonStyle={styles.button} title="Ingresar" />
        </View>
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
  buttonContainer: {
    height: hp(100) / 3,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
  button: {
    width: wp(90),
  },
});

export default App;
