import React from 'react';
import { StyleSheet, Dimensions, View, Button, TouchableHighlight, Image, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Cam from './Cam';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cameraContainer: {
    flex: 1,
    width: width,
    height: height,
  },
});

const CameraView = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar translucent={true} barStyle="light-content" />
    <View style={styles.cameraContainer}>
      <Cam navigation={navigation} />
    </View>
  </View>
);

CameraView.navigationOptions = {
    header: null,
};

CameraView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CameraView;
