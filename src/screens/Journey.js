import React, {useState, useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {axiosRequest} from '../function/Request';
import {checkSession, readData} from '../function/Realmio';

const Journey = ({navigation}) => {
  /// Verifico la session del usuario
  useEffect(() => {
    checkSession(navigation);
  });
  // info AXIOS
  const DataSave = readData()[0];

  const CompanyInfo = {id:DataSave.id, access_token:DataSave.token};
  
  const [plate, setPlate] = useState({});
  
  axiosRequest('info','get',CompanyInfo).then((resultInfoCompany) => {  
      let placas = resultInfoCompany.data
      setPlate(placas);
      
    }).catch(function (error) {
      console.log(error);
    }); 
    
    console.log(plate);
    
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </View>
          </View>
          <View style={styles.inputs}>
            <Text>Bienvenido Ricardo Polanco</Text>
            <Picker
              selectedValue={plate.plate}
              style={{height: hp(5), width: wp(90)}}
              onValueChange={(itemValue, itemIndex) =>
                setPlate({language: itemValue})
              }>
              <Picker.Item label="P469113" value="1" />
              <Picker.Item label="P886468" value="2" />
            </Picker>
          </View>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              title="Iniciar viaje"
              onPress={() => {
                navigation.navigate('Delivery');
              }}
            />
          </ImageBackground>
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
  body: {
    marginTop: -hp(17),
    paddingTop: hp(6),
    width: wp(100),
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
    alignItems: 'center',
    backgroundColor: '#1F57E5',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    width: wp(90),
  },
});

export default Journey;
