import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

class login extends Component {
  render() {
    return (

      <View style={styles.container}>

          <Text style={styles.title} >Stop&Watch</ Text>
          <Button
            style={styles.button}
            //onPress={}
            title="Log In"
            color="#FF0000"
            accessibilityLabel="Log in to an existing Stop&Watch account"
          />
          <Button
            style={styles.button}
            //onPress={onPressCreateAccount}
            title="Create Account"
            color="#FF0000"
            accessibilityLabel="Create a new Stop&Watch account"
          />

      </View>
    );
  }
  /*
  const onPressCreatAccount = () => {
    return (
      <View style={styles.container}>

          <Text style={styles.title} >HEY</Text>
      </View>

    );
  };

  const onPressLogin = () => {
    return (
      <View style={styles.container}>

          <Text style={styles.title} >HEY</Text>
      </View>

    );
  };
*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    flex: 0,
    width: 75,
    height: 75,
    margin: 50,
    justifyContent: 'flex-end'

  },
  title: {
    flex: 0,
    backgroundColor: '#fff',
    color: '#000',
    margin: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'

  }
});

module.exports = (login);
