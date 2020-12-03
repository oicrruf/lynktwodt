import React from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require('./src/assets/images/logo.png')}
          />
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
        <View style={styles.button}>
          <Button title="Ingresar" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputs: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F57E5',
  },
});

export default App;
