import React, {useState} from 'react';
import {Button, CheckBox} from 'react-native-elements';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useHeaderHeight} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const Journey = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  const [delivery, setDelivery] = useState([
    {
      id: 1,
      date: '2020-12-04',
      time: '10:26 a.m.',
      name: 'Juan Ramos',
      document: '03459785-2',
      lon: '1.10245789',
      lat: '-2.1248548',
      status: true,
    },
    {
      id: 2,
      date: '2020-12-04',
      time: '10:26 a.m.',
      name: 'Leonardo Mancía',
      document: '03459785-2',
      lon: '1.10245789',
      lat: '-2.1248548',
      status: false,
    },
  ]);
  return (
    <>
      <View style={styles.containter}>
        <View style={styles.body}>
          <Text style={styles.title}>¡Inicia tu entrega!</Text>
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
                  icon={<Icon name="plus" size={15} color="white" />}
                  buttonStyle={{
                    width: hp(6),
                    height: hp(6),
                  }}
                  onPress={() => {
                    console.log('Nueva entrega');
                  }}
                />
              </View>
            </View>
            <FlatList
              data={delivery}
              renderItem={({item}) => (
                <View style={styles.package} key={item.id}>
                  <View style={styles.box}>
                    <Image
                      source={require('../assets/images/box-delivery.png')}
                      height={hp(2)}
                      width={hp(2)}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.detailName}>{item.name}</Text>
                    <View style={styles.detailDatetime}>
                      <Text>{item.date}, </Text>
                      <Text>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.status}>
                    <Button
                      icon={<Icon name="check" size={15} color="white" />}
                      buttonStyle={{
                        width: hp(6),
                        height: hp(6),
                      }}
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
            title="Finalizar viaje"
            onPress={() => {
              navigation.navigate('Journey');
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
    fontSize: hp(2.5),
    marginBottom: hp(1),
    fontWeight: '700',
  },
  subtitle: {
    fontWeight: '700',
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
  },
  newPackage: {
    flex: 0,
    flexDirection: 'row',
    marginTop: hp(1),
    width: wp(90),
    height: hp(7),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    marginBottom: hp(2),
    backgroundColor: '#FFFFFF',
  },
  package: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp(1),
    width: wp(90),
    height: hp(7),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    backgroundColor: '#FFFFFF',
  },
  box: {
    backgroundColor: '#1F57E5',
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: wp(2),
  },
  detail: {
    flex: 1,
    paddingHorizontal: wp(2),
    justifyContent: 'center',
  },
  detailName: {
    fontWeight: '700',
  },
  detailDatetime: {
    flexDirection: 'row',
  },
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
