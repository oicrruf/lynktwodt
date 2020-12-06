import React, {useState,useEffect} from 'react';
import {Button, CheckBox} from 'react-native-elements';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {checkSession, readData,SaveRutaViaje,checkRute,cleanRuteViaje,readDataParadaRute,readDataRute,cleanRuteParadasViaje} from '../function/Realmio';
import {axiosRequest} from '../function/Request';
import {CurrentPosition} from "../function/CurrentPosition";

const Journey = ({navigation}) => {
  const [delivery, setDelivery] = useState(readDataParadaRute());

  //// Get Posicion
  useEffect(() => {
    const interval = setInterval(() => {
      CurrentPosition();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
 //// end Get Posicion
  
  

  const SincronizarAllRoutes = () => {
    /// Creo todo el paquete
    let ultraDataRoutes = {
      ruteFather: readDataRute()[0],
      ruteStops: JSON.parse(JSON.stringify(delivery))
    }

    /// Genero la peticion.
    axiosRequest('finparada', 'post', ultraDataRoutes)
                    .then((result) => {
                      /// Guardo Ruta iniciadad

                        if(result.data.message){
                          cleanRuteViaje();
                          cleanRuteParadasViaje();
                          navigation.reset({
                            index: 0,
                            routes: [{ name: "Journey" }],
                          });
                        }
                    
                    })
                    .catch(function (error) {
                      ///Guardo ruta iniciada
                      console.log(ultraDataRoutes);
                      console.log(error);
                        alert("Error en sincronizacion: Es requerida una conexión a internet para poder finalizar tu viaje.");
                    });


  }
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.body}>
          <Text style={styles.title}>¡Tus entrega!</Text>
          <View style={styles.container}>
            <View style={styles.newPackage}>
              <View style={styles.box}>
                <Image
                  source={require('../assets/images/box-new.png')}
                  height={hp(2)}
                  width={hp(2)}
                />
              </View>
              <View style={styles.detail}>
                <Text style={styles.subtitle}>Nueva entrega</Text>
              </View>
              <View style={styles.plus}>
                <Button
                  icon={<Icon name="plus" size={15} color="#1F57E5" />}
                  buttonStyle={styles.buttonItem}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Detail" }],
                    });
                  }}
                />
              </View>
            </View>
            <FlatList
              data={delivery}
              keyExtractor={item => item.duiBeneficiario}
              renderItem={({item}) => (
                <View style={styles.package}>
                  <View style={styles.box}>
                    <Image
                      source={require('../assets/images/box-delivery.png')}
                      height={hp(2)}
                      width={hp(2)}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.detailName}>{item.nombreBeneficiario}</Text>
                    <View style={styles.detailDatetime}>
                      <Text style={styles.date}>{item.fecha}, </Text>
                      <Text style={styles.time}>{item.hora}</Text>
                    </View>
                  </View>
                  <View style={styles.status}>
                    <Button
                      buttonStyle={[
                        styles.buttonItem,
                        {backgroundColor: '#41E932'},
                      ]}
                      icon={<Icon name="check" size={15} color="#1F57E5" />}
                      onPress={() => {
                        console.log(`Ver detalle de ${item.id}`);
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            title="Finalizar viaje"
            onPress={() => {
              SincronizarAllRoutes();
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
  title: {
    fontSize: hp(3),
    marginBottom: hp(3),
    fontFamily: 'Poppins-Bold',
    color: '#1F57E5',
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(2),
    color: '#1F57E5',
  },
  body: {
    marginTop: -hp(17),
    paddingTop: hp(6),
    height: hp(82),
    width: wp(100),
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
    backgroundColor: '#F7D64B',
  },
  textButton: {
    color: '#1F57E5',
    textTransform: 'uppercase',
    fontSize: hp(2),
    fontFamily: 'Poppins-Bold',
  },
  buttonItem: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(20),
    borderWidth: 3,
    borderColor: '#A5B4DC',
    backgroundColor: 'transparent',
  },
  newPackage: {
    flex: 0,
    flexDirection: 'row',
    marginTop: hp(1),
    width: wp(90),
    height: hp(8),
    borderRadius: 6,
    borderColor: '#c2c2c2',
    marginBottom: hp(2),
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  package: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: hp(0.5),
    width: wp(90),
    height: hp(8),
    borderRadius: 6,
    borderColor: '#c2c2c2',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  box: {
    backgroundColor: '#1F57E5',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: wp(3),
  },
  detail: {
    flex: 1,
    paddingHorizontal: wp(6),
    justifyContent: 'center',
  },
  detailName: {
    fontFamily: 'Poppins-Bold',
    fontSize: hp(2),
    color: '#1F57E5',
  },
  detailDatetime: {
    flexDirection: 'row',
  },
  date: {fontSize: hp(2), color: '#1F57E5', fontFamily: 'Poppins-Regular'},
  time: {fontSize: hp(2), color: '#1F57E5', fontFamily: 'Poppins-Regular'},
  status: {
    width: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    width: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Journey;
