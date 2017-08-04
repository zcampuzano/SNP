import React from 'react';
import { StyleSheet } from 'react-native';
var screen = require('Dimensions').get('window');

module.exports = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  videoContainer: {
    flex: 1,
    width: screen.width,
    height: screen.height,
  },
  videoBackButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute'
  },
  videoBack: {
    flex: 0,
    width: 27.5,
    height: 27.5,
    margin: 25,
    marginLeft: 5,
    backgroundColor: '#0000'
  },
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    left: 120,
    right: 120,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 20,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  track: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#FFF',
    paddingLeft: 15,
    paddingRight: 15,
    lineHeight: 20,
  },
  barWrapper: {
		width: screen.width,
		height: 3,
		backgroundColor: '#000',
		opacity: 1,
	},
	barGauge: {
		width: 0,
		height: 3,
		backgroundColor: '#FFF'
	},
});
