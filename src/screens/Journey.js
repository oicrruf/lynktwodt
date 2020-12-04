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
  },[]);

  // info AXIOS
  const DataSave = readData()[0];
  const CompanyInfo = {id:DataSave.id, access_token:DataSave.token};
  const [plate, setPlate] = useState({});
  
  useEffect(() => {
    axiosRequest('info','get',CompanyInfo).then((resultInfoCompany) => {  
      let placas = resultInfoCompany.data

    }).catch(function (error) {
      console.log(error);
    }); 
  }, []);
  
    
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.body}>
          <View style={styles.header}>
            <ImageBackground
              source={require('../assets/images/bg-header.png')}
              style={styles.headerContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </ImageBackground>
          </View>
          <View style={styles.inputs}>
            <Text style={styles.title}>¡Bienvenido</Text>
            <Text style={styles.title}>Ricardo Polanco!</Text>
            <Picker
              selectedValue={plate.plate}
              style={styles.picker}
              dropdownIconColor={'#FFFFFF'}
              onValueChange={(item, i) => setPlate({language: item})}>
              <Picker.Item label="P469113" value="1" />
              <Picker.Item label="P886468" value="2" />
            </Picker>
          </View>
          <ImageBackground
            source={require('../assets/images/bg-footer.png')}
            style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
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
    borderBottomEndRadius: wp(20),
    borderBottomStartRadius: wp(20),
  },
  logo: {
    marginBottom: hp(7),
  },
  title: {
    fontSize: hp(3),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  picker: {
    marginTop: hp(4),
    color: '#FFFFFF',
    height: hp(5),
    width: wp(90),
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
    backgroundColor: '#FFF',
  },
  textButton: {
    color: '#1F57E5',
    textTransform: 'uppercase',
    fontSize: hp(2.5),
    fontWeight: '700',
  },
});

export default Journey;
