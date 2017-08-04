import React from 'react';
import { StyleSheet } from 'react-native';
var screen = require('Dimensions').get('window');

module.exports = StyleSheet.create({
  wrapper: {
		flex: 1
	},
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cameraContainer: {
    flex: 1,
    width: screen.width,
    height: screen.height,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 10,
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settings: {
    margin: 10,
    width: 30,
    height: 30,
    backgroundColor: '#0000'
  },
  save: {
    width: 30,
    height: 25,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#0000'
  },
  stopwatch: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  record: {
    width: 30,
    height: 25,
    marginTop: 28,
    marginRight: 10
  },

  tray: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    width: 30,
    height: 30,
    backgroundColor: '#0000',
  },
  recordButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 25
  },

  barWrapper: {
		width: screen.width,
		height: 3,
		backgroundColor: "black",
		opacity: 1,
	},
	barGauge: {
		width: 0,
		height: 3,
		backgroundColor: "rgb(147, 24, 24)"
	},
});
