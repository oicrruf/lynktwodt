import React from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Journey = () => {
  return (
    <>
      <View style={styles.containter}>
        <Text>Journey</Text>
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
});

export default Journey;
