import {StyleSheet, View, Image, Text, ImageBackground,PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {checkSession, readData,SaveRutaViaje,SaveParadaViaje,checkRute,cleanRuteViaje,readDataRute,readGeo,SaveGeo} from './Realmio';
import Geolocation from '@react-native-community/geolocation';

  export async function CurrentPosition() {
    try {
      const granted = await PermissionsAndroid.request(
       
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Lynktwo',
          'message': 'Para poder utilizar Lynktwo Dominacion territorial es necesario aceptar el permiso de geolocalizacion.'
        },
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

          // traigo mi geo localizacion
          Geolocation.getCurrentPosition(
            position => {
              const initialPosition = position;
              let coords = initialPosition.coords.latitude + "/" +initialPosition.coords.longitude;

              // guardo las coordenadas
              let obj = { id:1 , geo:coords};
              SaveGeo(obj);
              console.log(obj);
            }
          );
      } else {
        alert("Sin permisos");
      }

    } catch (err) {
      console.warn(err)
    }
  }


  export async function CurrentPosition2() {
     setInterval(() => CurrentPosition, 1000);
  }