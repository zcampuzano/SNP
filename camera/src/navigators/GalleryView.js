import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Gallery from '../components/Gallery';
import styles from '../styles/styleG';

const GalleryView = ({ navigation, path }) => (
  <View style={styles.top}>
  <StatusBar translucent={false} barStyle="dark-content" />

    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Image source={require('../img/black.png')} style={styles.back}/>
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>gallery</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Image source={require('../img/settingsblack.png')} style={styles.settings}/>
      </TouchableOpacity>
    </View>
  <Gallery navigation={navigation} />
  </View>

);

GalleryView.navigationOptions = {
  header: null,
};

GalleryView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GalleryView;
