import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginStackNavigation as Login} from './src/navigations/Stack';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    </>
  );
};

export default App;
