import React, {useState, useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Image, Text, ImageBackground,PermissionsAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {axiosRequest} from '../function/Request';
import {checkSession, readData,SaveRutaViaje,checkRute,cleanRuteViaje} from '../function/Realmio';
import moment from "moment";
import {requestLocationPermission} from "../function/requesPermisos";
import Geolocation from '@react-native-community/geolocation';

const Journey = ({navigation}) => {
  /// Verifico la session del usuario
  useEffect(() => {
    checkSession(navigation);
    checkRute(navigation);
  }, []);

  // info AXIOS
  const DataSave = readData()[0];
  const CompanyInfo = {id: DataSave.id, access_token: DataSave.token};
  const [plate, setPlate] = useState(false);
  const [plateSelection, setPlateSelection] = useState("");


  if (!plate) {
    axiosRequest('info', 'get', CompanyInfo)
      .then((resultInfoCompany) => {
        
       let  placas = resultInfoCompany.data;
       
        /// seleccion placa actual de conductor.
        setPlateSelection(placas.placaPropia);

        let dataRender = placas.placas.map((data) => {
          return (
            <Picker.Item
              label={data.license_plate}
              value={data.license_plate}
              key={data.license_plate}
            />
          );
        });
        setPlate(dataRender);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    ///////////////// send info ////////////////

    async function  IniciandoRuta(){
    
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + plateSelection.license_plate;
      
        for (var i = 0; i < 10; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
  console.log(text);

      if((plateSelection.license_plate != "") && (plateSelection != "")){
        try {
            const granted = await PermissionsAndroid.request(
             
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Lynktwo',
                'message': 'Para poder utilizar Lynktwo Dominacion territorial es necesario aceptar el permiso de geolocalizacion.'
              },
            );
            
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

              /// permisos aceptados  

              // formo objeto de envio 
              let dataToSend = {
                      id:1,
                      code:text,
                      fecha:moment().format('YYYY/MM/DD'),
                      hora:moment().format('HH:mm'),
                      nombre:DataSave.user,
                      placa:plateSelection.license_plate,
                      estado:1,
                      coordenadas:"",
                    }

                // traigo mi geo localizacion
                Geolocation.getCurrentPosition(
                  position => {
                    const initialPosition = position;
                    dataToSend.coordenadas = initialPosition.coords.latitude + "/" +initialPosition.coords.longitude;
                    /// todo listo para enviar.
                    axiosRequest('saveRute', 'post', CompanyInfo)
                    .then((result) => {
                      console.log(result.data);
                      /// Guardo Ruta iniciadad
                      SaveRutaViaje(dataToSend);

                    })
                    .catch(function (error) {

                      ///Guardo ruta iniciada
                      SaveRutaViaje(dataToSend);
                    });

                  }
                );
            } else {
              alert("Sin permisos");
            }
    
          } catch (err) {
            console.warn(err)
          }
        }else{
          alert("Debe seleccionar una placa para iniciar ruta.");
        }
    }

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
            <Text style={styles.title}>{DataSave.user}!</Text>
            <Picker
              selectedValue={plateSelection.license_plate}
              style={styles.picker}
              dropdownIconColor={'#FFFFFF'}
              onValueChange={(item, i) =>
                setPlateSelection({license_plate: item})
              }>
              <Picker.Item label="Seleccionar Placa" value="" />
              {plate}
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
                IniciandoRuta()
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
    fontFamily: 'Poppins-Bold',
    fontSize: hp(3),
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
    fontFamily: 'Poppins-Bold',
  },
});

export default Journey;
