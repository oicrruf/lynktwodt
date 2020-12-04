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




export function cleanLogin() {

  Users = new Realm({ path: 'UsersDatabase.realm' });

  try {
    Users.write(() => {
      // Create a book object
      let DataUsers = Users.objects('Users');
      Users.delete(DataUsers);
  });

  }catch (error) {
    console.log('Error en realmio.js');
  }
}

export function reLogin(navigation){
  

  Users = new Realm({ path: 'UsersDatabase.realm' });
  try {
    Users.write(() => {

      let DataUsers = Users.objects('Users');
     
        if(DataUsers.length > 0){
          navigation.reset({
            index: 0,
            routes: [{name: 'Journey'}],
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