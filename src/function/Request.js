import {useState} from 'react';
import axios from 'axios';


export function axiosRequest(endpoint,method,data) {
  
        let AllEnpoint = {
          login : "https://www.lynktwo.com/api/auth/login",
          info : "https://www.lynktwo.com/api/auth/driverInfo/",
        };

        let header = {};

        switch (endpoint) {
          case ('login' || signup):
            header = {'Content-Type': 'application/json'};
          break;

          case ('info'):
            AllEnpoint.[endpoint]= AllEnpoint.[endpoint] + data.access_token + "/" + data.id;
          break;
        
          default:
            header = {};
          break;

          }
          
          let contentAxios = {
            method: method,
            url: AllEnpoint.[endpoint],
            headers: header,
            data:data
          };
          
        

          return  axios(contentAxios);
         
  }