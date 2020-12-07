import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  checkSession,
  readData,
  SaveRutaViaje,
  SaveParadaViaje,
  checkRute,
  cleanRuteViaje,
  readDataRute,
  readGeo,
  SaveGeo,
} from './Realmio';
import Geolocation from '@react-native-community/geolocation';

export async function CurrentPosition() {
  const showToast = () => {
    ToastAndroid.show('Compruebe si su GPS está encendido', ToastAndroid.SHORT);
  };
  try {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]).then((result) => {
      if (
        result['android.permission.ACCESS_COARSE_LOCATION'] &&
        result['android.permission.ACCESS_FINE_LOCATION'] &&
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        // traigo mi geo localizacion
        Geolocation.getCurrentPosition(
          (position) => {
            const initialPosition = position;
            let coords =
              initialPosition.coords.latitude +
              '/' +
              initialPosition.coords.longitude;

            // guardo las coordenadas
            let obj = {id: 1, geo: coords};
            SaveGeo(obj);
            console.log(obj);
          },
          (error) => {
            showToast();
          },
        );
      } else if (
        result['android.permission.ACCESS_COARSE_LOCATION'] ||
        result['android.permission.ACCESS_FINE_LOCATION'] ||
        result['android.permission.READ_EXTERNAL_STORAGE'] ||
        result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          'never_ask_again'
      ) {
      }
    });
  } catch (error) {}
}

export async function CurrentPosition2() {
  setInterval(() => CurrentPosition, 1000);
}
