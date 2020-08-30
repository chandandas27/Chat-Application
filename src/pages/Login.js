import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin } from '../actions/userAction';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      errors:{}
    };
    this.validateForm = this.validateForm.bind(this);
  }
     
  handleEmail = (text) => {
    this.setState({ email: text})
  }
  handlePassword = (text) => {
    this.setState({ password: text})
  }


  validateForm () {
    const { errors } = this.state;
    const emailaddr = this.state.email;
    const pass = this.state.password;
    const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
    if (emailaddr === '') {
      errors.email = "Email address cannot be empty.";
    } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
      errors.email = "Please provide correct email address";
    } else {
      errors.email = '';
    }

    if (pass === ''){
      errors.pass = "Password cannot be empty.";
    } else if (pass && pass.length < 5) {
      errors.pass = "Password should be more than 5 characters.";

    } else {
      errors.pass = '';

    } 
    this.setState({ errors})
    if (errors.email=== '' && errors.pass === ''){
      const userinfo = {
              email: this.state.email,
              password: this.state.password
             }
             this.props.onLogin(userinfo)
    }
  }

  goToRegister = () => {
    this.props.navigation.navigate('Register');
  }

   componentDidUpdate(nextProps) {
     if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
      }
    }


 render(){
   const { errors } = this.state;
    return (

      <View style={styles.container}>

        <Text style={styles.logo}>Chan Chat</Text>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#100303"
            autoCapitalize="none"
            onChangeText={this.handleEmail}/>
         <Text style={[styles.errorstyle]}>{errors.email}</Text>      
        </View>
                        

        <View style={styles.inputView}>
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#100303"
            autoCapitalize="none"
            onChangeText={this.handlePassword}/>
          <Text style={[styles.errorstyle]}>{errors.pass}</Text>  
        </View>


      
        <TouchableOpacity style={styles.loginBtn}
        onPress = {this.validateForm}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.loginBtn}
        onPress = {this.goToRegister}>
          <Text style={styles.loginText}>REGISTER</Text>
        </TouchableOpacity>
        </View>
      
   
    );
  }
}


function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (userinfo) => dispatch(userLogin(userinfo))
  };
}
  

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Login);



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffdc34',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#ff0000",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#32e0c4",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#010a43"
  },
  
  loginBtn:{
    width:"80%",
    backgroundColor:"#ff4301",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  errorstyle:{                          
     fontSize: 10,
    alignSelf: 'center',
    color: '#ff0000'
  },

  loginText:{
    color:"white"
  }
  

});