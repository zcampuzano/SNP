import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';


class loginCheck extends Component {
  state = { users: [] }; //empty list

  componentWillMount () {
    axios.get('http://.............') //http request
    .then(response => this.setState({ users: response.data }));
  }

  renderUsers() {
    return this.state.users.map(user =>
      <Text key={users.name}>{users.name, users.password}</Text>);
      .then(
        //get user input and check name/password combination
      );
  }

  render() {
    console.log(this.state);
  }

}
