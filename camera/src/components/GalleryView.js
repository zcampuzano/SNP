import React from 'react';
import { StyleSheet, Dimensions, View, Text, Button, StatusBar, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Gallery from './Gallery';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    width: 25,
    height: 25,
    marginLeft: 0,
    backgroundColor: '#0000'
  },
  settings: {
    width: 25,
    height: 25,
    marginRight: 5,
    backgroundColor: '#0000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: width,
    shadowColor: '#0001',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    marginTop: 20
  },
  headerText: {
    fontSize: 25,
    fontWeight: '200',
    alignItems: 'center',
    textAlign: 'center',
  },
});


const GalleryView = ({ navigation, path }) => (
  <View style={styles.container}>
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
