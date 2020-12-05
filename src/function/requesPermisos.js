import {StyleSheet, View, Image, Text, ImageBackground,PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';

  export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
         
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Lynktwo',
            'message': 'Para poder utilizar Lynktwo Dominacion territorial es necesario aceptar el permiso de geolocalizacion.'
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           
        } else {
          alert("Sin permisos");
        }

      } catch (err) {
        console.warn(err)
      }
}