import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password:''
    };
  }
render() {
  return (
    <View style = {styles.container}>
         <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              placeholderTextColor = "#f3c623"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}/>

          <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Password"
              placeholderTextColor = "#f3c623"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}/>

          <TouchableOpacity
             style = {styles.submitButton}
             onPress = {
                () => this.login(this.state.email, this.state.password)
              }>
              <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
      </View>
    );
             }
}

export default Login;



const styles = StyleSheet.create({

  container: {
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
input: {
  margin: 15,
  height: 40,
  borderColor: '#000',
  borderWidth: 1,
  width: '70%',
  padding: 10,
  fontSize: 16,
  lineHeight: 20,
  color:'#46b3e6'
},

submitButton: {
  backgroundColor: '#2fc4b2',
  padding: 10,
  margin: 15,
  height: 40,
},

submitButtonText:{
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold'
}

})

handleEmail = (text) => {
  this.setState({ email: text})
}
handlePassword = (text) => {
  this.setState({ password: text})
}
login = (email, pass) => {
  alert('email:' + email + ' password' + pass)
}
