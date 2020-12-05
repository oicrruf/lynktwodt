import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Detail = ({navigation}) => {
  const [detail, setDetail] = useState([
    {
      id: 1,
      date: '2020-12-04',
      time: '10:26 a.m.',
      name: 'Juan Ramos',
      document: '03459785-2',
      lon: '1.10245789',
      lat: '-2.1248548',
    },
  ]);
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
                placeholder="Nombre"
                inputStyle={styles.textInputs}
                inputContainerStyle={styles.containerInputs}
                leftIcon={<Icon name="user" size={hp(2.5)} color="#1F57E5" />}
              />
              <Input
                placeholder="DUI"
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
                navigation.navigate('Delivery');
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
    fontSize: hp(2.5),
    fontFamily: 'Poppins-Bold',
  },
  textInputs: {
    color: '#FFF',
    fontSize: hp(2.5),
    fontFamily: 'Poppins-Regular',
  },
  containerInputs: {borderBottomColor: '#939090'},
});

export default Detail;
