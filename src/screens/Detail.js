import React, {useState,useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Image,PermissionsAndroid} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {checkSession, readData,SaveRutaViaje,SaveParadaViaje,checkRute,cleanRuteViaje,readDataRute,readGeo} from '../function/Realmio';
import moment from "moment";
import {axiosRequest} from '../function/Request';
import Geolocation from '@react-native-community/geolocation';
import {CurrentPosition} from "../function/CurrentPosition";

const Detail = ({navigation}) => {
  useEffect(() => {
    checkSession(navigation);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      CurrentPosition();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  
  const [GetName, setformName] = useState(false);
  const [GetDui, setformDui] = useState(false);


  const getValue = (value, type = false) => {
    type ? setformName(value) : setformDui(value);
  };


  async function SaveParada() {
    try {
     

        const dataRute = readDataRute()[0];

        const datauser =  {
          route_id : dataRute.codigoRuta,
           fecha:moment().format('YYYY/MM/DD'),
           hora:moment().format('HH:mm'),
           nombreBeneficiario:GetName,
           duiBeneficiario:GetDui,
           checkpoint:"none",
           state: 1
          };

               datauser.checkpoint = readGeo()[0].geo;
              
                /// envio la notificaciones 
                axiosRequest('beneficiario', 'post',datauser )
                .then((resultAxios) => {
                  SaveParadaViaje(datauser);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Delivery" }],
                  });
                })
                .catch(function (error) {
                  console.log(error);
                  SaveParadaViaje(datauser);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Delivery" }],
                  });
                });
        

    } catch (err) {
      console.warn(err)
    }

  };

  return (
    <>
      <View style={styles.containter}>
        <View style={styles.body}>
          <Text style={styles.title}>Entrega</Text>
          <View style={styles.form}>
            <Image
              style={styles.deliveryImage}
              source={require('../assets/images/delivery.png')}
            />
            <View style={styles.inputs}>
              <Input
               onChangeText={(event) => getValue(event,"nombre")}
                placeholder="Nombre"
                inputStyle={styles.textInputs}
                inputContainerStyle={styles.containerInputs}
                leftIcon={<Icon name="user" size={hp(2.5)} color="#1F57E5" />}
              />
              <Input
                placeholder="DUI"
                keyboardType='numeric'
                maxLength={9}
                onChangeText={(event) => getValue(event)}
                inputStyle={styles.textInputs}
                inputContainerStyle={styles.containerInputs}
                leftIcon={
                  <Icon name="id-card" size={hp(2.5)} color="#1F57E5" />
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
              title="Guardar"
              onPress={() => {
                SaveParada();
              }}
            />
          </View>
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
    paddingTop: hp(5),
    height: hp(92),
    width: wp(100),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(3),
    marginBottom: hp(3),
    fontFamily: 'Poppins-Bold',
    color: '#1F57E5',
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    height: hp(10),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp(90),
  },
  deliveryImage: {
    height: hp(30),
    width: hp(30),
    marginBottom: hp(5),
  },
  inputs: {
    height: hp(25),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp(90),
    backgroundColor: '#41E932',
  },
  textButton: {
    color: '#1F57E5',
    textTransform: 'uppercase',
    fontSize: hp(2),
    fontFamily: 'Poppins-Bold',
  },
  textInputs: {
    color: '#939090',
    fontSize: hp(2),
    fontFamily: 'Poppins-Regular',
  },
  containerInputs: {borderBottomColor: '#939090'},
});

export default Detail;
