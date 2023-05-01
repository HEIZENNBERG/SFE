// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../database/firebase';

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  userLogin = async () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        if(this.state.email === "admin@gmail.com"){
          this.props.navigation.navigate('./HSE/main_hse.js')
        }
        else{
        console.log('User logged-in successfully!')
        this.props.navigation.navigate('Dashboard')
      }
      } catch (error) {
        console.log(error)
        Alert.alert('Error signing in', error.message)
      }
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
      <Image source={require('../src/images/download.png')} style={styles.logo} />
        <Text  style={styles.heading} >Login to HSE App</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          title="Sign In"
          onPress={() => this.userLogin()}
        />   
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have an account?  SignUp here 
        </Text>                          
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor:'#f2f2f2'
},
buttonContainer: {
backgroundColor: "#ff2323",
borderRadius: 5,
height: 50,
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
marginTop: 20
},
buttonText: {
color: "#fff",
fontSize: 18,
fontWeight: "bold",
textTransform: "uppercase"
},
loginText: {
color: '#3740FE',
marginTop: 25,
textAlign: 'center'
},
preloader: {
left: 0,
right: 0,
top: 0,
bottom: 0,
position: 'absolute',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff'
},
heading: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 30,
},
logo: {
  width: 200,
  height: 200,
  alignSelf: 'center'
}
});