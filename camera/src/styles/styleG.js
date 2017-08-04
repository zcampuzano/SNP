import React from 'react';
import { StyleSheet } from 'react-native';
var screen = require('Dimensions').get('window');

module.exports = StyleSheet.create({
  top: {
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
    width: screen.width,
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
  container: {
    flex: 1,
    backgroundColor: '#0000'
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: .1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  actionTray: {
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0000',
    padding: 7.5,
  },
  actionButton: {
    width: 27.5,
    height: 27.5,
  },
});
