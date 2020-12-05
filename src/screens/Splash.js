import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = () => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/launch_screen.png')}
          style={styles.bgContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/splash.png')}
          />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
  },
  bgContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    backgroundColor: '#1F57E5',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp(79),
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
