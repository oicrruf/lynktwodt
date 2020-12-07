const Realm = require('realm');
import moment from "moment";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';


  const loginSchema = new Realm({
    path: 'UsersDatabase.realm',
    schema: [
      {
        name: 'Users',
        primaryKey: 'id',
        properties: {
            id : 'int',
            token:  'string',
            user: 'string',
            expires_at: 'string',
        },
      },
    ],
  });

  
  const RuteViajeSchema = new Realm({
    path: 'RuteViajesDatabase.realm',
    schema: [
      {
        name: 'RuteViaje',
        primaryKey: 'id',
        properties: {
            id : 'int',
            codigoRuta:"string",
            fecha:"string",
            hora:"string",
            nombreMotorista:"string",
            placaCamion:"string",
            status:"int",
            geolocalizacion:"string",
        },
      },
    ],
  });


  const ParadaRuta = new Realm({
    path: 'RutaParadaDatabase.realm',
    schema: [
      {
        name: 'RuteViaje',
        properties: {
          route_id : 'string',
            fecha:"string",
            hora:"string",
            nombreBeneficiario:"string",
            duiBeneficiario:"string",
            checkpoint:"string",
            state: "int"
        },
      },
    ],
  });

  const lastGeo = new Realm({
    path: 'lastgeodatabase.realm',
    schema: [
      {
        name: 'lastgeo',
        primaryKey: 'id',
        properties: {
             id : 'int',
            geo: "string"
        },
      },
    ],
  });



  /// save access_token
export function access_token(data,CheckStatus = false) {
    if(data){

      let time_expires = CheckStatus 
      ? moment().add(365, 'day').format('LLL') 
      : moment().add(1, 'hours').format('LLL');

      Users = new Realm({ path: 'UsersDatabase.realm' });
      
        try {
          /// variables para guardar.
            
          const idCompany = (data.companyInfo.id) ? data.companyInfo.id : false;
          const access_token = (data.data[0].access_token) ? data.data[0].access_token : false;
          const first_name = (data.companyInfo.first_name) ? data.companyInfo.first_name : false;
          const last_name = (data.companyInfo.last_name) ? data.companyInfo.last_name : false;

            Users.write(() => {
               
                let DataUsers = Users.objects('Users');
                Users.delete(DataUsers);
                let UserData = Users.create('Users', {id: idCompany, token: access_token, user: first_name + " " + last_name, expires_at:time_expires});
            
            });
        } catch (error) {
            console.log('Error en realmio.js');
        }
    }

}


export function readData() {

 
  Users = new Realm({ path: 'UsersDatabase.realm' });
  let data = "";
  try {
    Users.write(() => {
      let DataUsers = Users.objects('Users');
      data = DataUsers;

  });
  
  }catch (error) {
    console.log(error);
  }

  return data;
}




export function cleanLogin(navigation) {

  Users = new Realm({ path: 'UsersDatabase.realm' });
  Rv = new Realm({ path: 'RuteViajesDatabase.realm' });

  try {
    Rv.write(() => {

      let rute = Rv.objects('RuteViaje');
     
        if(rute.length > 0){
          alert("Debe Finalizar ruta antes de cerrar su sesion de usuario.");
        }else{
          Users.write(() => {
            // Create a book object
            let DataUsers = Users.objects('Users');
            Users.delete(DataUsers);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
        });
        }
    
      
  });
  cleanGeo();
  }catch (error) {
    console.log(error);
  }

  
}

export function reLogin(navigation){
  

  Users = new Realm({ path: 'UsersDatabase.realm' });
  
  Rv = new Realm({ path: 'RuteViajesDatabase.realm' });
  try {
    Users.write(() => {

      let DataUsers = Users.objects('Users');
      let RuteViaje = Rv.objects('RuteViaje');
      let namecomponent ="";
     
        if(DataUsers.length > 0){

            Rv.write(() => {
        
             
                if(RuteViaje.length > 0){
                  namecomponent="Delivery";
                }else{
                  namecomponent="Journey";
                }
              
          });
          
          navigation.reset({
            index: 0,
            routes: [{ name: namecomponent }],
          });


        }else{
          
        }
     
  });
  
  }catch (error) {
    console.log(error);
  }
}

export function checkSession(navigation){
  

  Users = new Realm({ path: 'UsersDatabase.realm' });
  try {
    Users.write(() => {

      let DataUsers = Users.objects('Users');
     
        if(DataUsers.length > 0){
          
        }else{
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
    
      
  });
  
  }catch (error) {
    console.log(error);
  }
}


export function SaveRutaViaje(obj){
  

  Rv = new Realm({ path: 'RuteViajesDatabase.realm' });
  try {
    Rv.write(() => {
      let DataUsers = Rv.objects('RuteViaje');
      Rv.delete(DataUsers);
      let UserData = Rv.create('RuteViaje', obj);
  });
  
  }catch (error) {
    console.log(error);
  }
}


export function SaveGeo(obj){

  Rv = new Realm({ path: 'lastgeodatabase.realm' });
  try {
    Rv.write(() => {
      let DataUsers = Rv.objects('lastgeo');
      let UserData = Rv.create('lastgeo', obj, 'modified');
  });
  
  }catch (error) {
    console.log(error);
  }
}

export function SaveParadaViaje(obj){
  
  Rv = new Realm({ path: 'RutaParadaDatabase.realm' });
  try {
    Rv.write(() => {
      let DataUsers = Rv.objects('RuteViaje');
      let UserData = Rv.create('RuteViaje', obj);
  });
  
  }catch (error) {
    console.log(error);
  }
}


export function checkRute(navigation){
  

  Rv = new Realm({ path: 'RuteViajesDatabase.realm' });
  try {
    Rv.write(() => {

      let DataUsers = Rv.objects('RuteViaje');
     
        if(DataUsers.length > 0){
          navigation.reset({
            index: 0,
            routes: [{name: 'Delivery'}],
          });
        }else{
          
        }
    
      
  });
  
  }catch (error) {
    console.log(error);
  }
}



export function cleanRuteViaje() {

  Rv = new Realm({ path: 'RuteViajesDatabase.realm' });

  try {
    Rv.write(() => {
      // Create a book object
      let DataUsers = Rv.objects('RuteViaje');
      Rv.delete(DataUsers);
  });

  }catch (error) {
    console.log('Error en realmio.js');
  }
  cleanGeo();
}

export function cleanRuteParadasViaje() {

  Rv = new Realm({ path: 'RutaParadaDatabase.realm' });

  try {
    Rv.write(() => {
      // Create a book object
      let DataUsers = Rv.objects('RuteViaje');
      Rv.delete(DataUsers);
  });

  }catch (error) {
    console.log('Error en realmio.js');
  }
}

export function cleanGeo() {

  Rv = new Realm({ path: 'lastgeodatabase.realm' });

  try {
    Rv.write(() => {
      // Create a book object
      let DataUsers = Rv.objects('lastgeo');
      Rv.delete(DataUsers);
  });

  }catch (error) {
    console.log('Error en realmio.js');
  }
}

export function readDataRute() {

 
  Users = new Realm({ path: 'RuteViajesDatabase.realm' });
  let data = "";
  try {
    Users.write(() => {
      let DataUsers = Users.objects('RuteViaje');
      data = DataUsers;

  });
  
  }catch (error) {
    console.log(error);
  }

  return data;
}

export function readGeo() {

 
  Users = new Realm({ path: 'lastgeodatabase.realm' });
  let data = "";
  try {
    Users.write(() => {
      let DataUsers = Users.objects('lastgeo');
      data = DataUsers;

  });
  
  }catch (error) {
    console.log(error);
  }

  return data;
}


export function readDataParadaRute() {

 
  Users = new Realm({ path: 'RutaParadaDatabase.realm' });
  let data = "";
  try {
    Users.write(() => {
      let DataUsers = Users.objects('RuteViaje');
      data = DataUsers;

  });
  
  }catch (error) {
    console.log(error);
  }

  return data;
}