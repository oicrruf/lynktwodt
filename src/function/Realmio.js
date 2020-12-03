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
export function access_token(token,user,CheckStatus) {
    if((token) && (user)){

      let time_expires = CheckStatus 
      ? moment().add(365, 'day').format('LLL') 
      : moment().add(1, 'hours').format('LLL');

      Users = new Realm({ path: 'UsersDatabase.realm' });
        
        try {
            Users.write(() => {
               
                let DataUsers = Users.objects('Users');
                Users.delete(DataUsers);
                let UserData = Users.create('Users', {id: 1, token: token, user: user, expires_at:time_expires});

                console.log(UserData);
            
            });
        } catch (error) {
            console.log('Error en realmio.js');
        }
    }

}


export function reloadLogin() {

  Users = new Realm({ path: 'UsersDatabase.realm' });
  let data = '';
  try {
    Users.write(() => {
      // Create a book object
      let DataUsers = Users.objects('Users');
      
       data =  DataUsers;
  
  });

  return data;
  } catch (error) {
    console.log('Error en realmio.js');
  }
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

export function checkSession(navigation){
  
  
/*
  Users = new Realm({ path: 'UsersDatabase.realm' });
  try {
    Users.write(() => {

     
      // Create a book object
      let DataUsers = Users.objects('Users');
     
        if(DataUsers.length > 0){
          
        }else{
          navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
          });
        }
    
      
  });
  
  }catch (error) {
    console.log(error);
  }*/
}