import React, {useState,useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {axiosRequest} from "../function/Request";
import {checkSession,readData} from "../function/Realmio";


const Journey = ({navigation}) => {

  /// Verifico la session del usuario 
  useEffect(() => {
    checkSession(navigation);
  });
  // info AXIOS
  const DataSave = readData();

  const CompanyInfo = {id:DataSave.id, access_token:DataSave.access_token};
  console.log(CompanyInfo);
        
  /// Get info placas y name users
  axiosRequest('info','get',CompanyInfo).then((resultInfoCompany) => {  
  
    if(resultInfoCompany.data){
      const dataPlacas = resultInfoCompany.data[0];
        navigation.push("Journey");
    }

  }).catch(function (error) {
    console.log(error);
  }); 



  const [plate, setPlate] = useState({
    plate: 'P469113',
  });

  
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
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title="Iniciar viaje"
            onPress={() => {
              navigation.navigate('Delivery');
            }}
          />
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

export default Journey;
