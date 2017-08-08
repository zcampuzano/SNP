import React from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Camera from '../components/Camera';
import styles from '../styles/styleC';

const CameraView = ({ navigation }) => (
  <View style={styles.top}>
    <StatusBar translucent={true} barStyle="light-content" />
    <View style={styles.cameraContainer}>
      <Camera navigation={navigation} />
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
