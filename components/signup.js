// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import PasswordInput from './PasswordInput';

export default class Signup extends Component {
  static navigationOptions = {
    headerShown: false
  };
  constructor() {
    super();
    this.state = { 
      firstName: '',
      lastName: '',
      number:'',
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
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '' && this.state.number ===''&& this.state.lastName ===''&& this.state.firstName ==='') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {

        const workerRef = firebase.firestore().collection('workers').doc(res.user.uid);
        workerRef.set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          number: this.state.number,
          email: this.state.email
        })
        .then(() => {
          console.log('Worker created successfully!')
          console.log('User registered successfully!')
          this.setState({
            isLoading: false,
            firstName: '',
            lastName: '',
            email: '', 
            password: ''
          })
          this.props.navigation.navigate('Login')
        })
        .catch(error => {
          console.error('Error creating worker: ', error);
          this.setState({ 
            isLoading: false, 
            errorMessage: error.message 
          });
        });
      })
      .catch(error => {
        console.error('Error creating user: ', error);
        this.setState({ 
          isLoading: false, 
          errorMessage: error.message 
        });
      });      
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
      <Text  style={styles.heading} >Register</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="First Name"
          value={this.state.firstName}
          onChangeText={(val) => this.updateInputVal(val, 'firstName')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Last Name"
          value={this.state.lastName}
          onChangeText={(val) => this.updateInputVal(val, 'lastName')}
        /> 
        <TextInput
          style={styles.inputStyle}
          placeholder="phone number"
          value={this.state.number}
          onChangeText={(val) => this.updateInputVal(val, 'number')}
        /> 
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <PasswordInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
        />
        <View style={styles.button}>
          <Button
            title="Sign Up"
            onPress={() => this.registerUser()}
          />
        </View>
        <View style={styles.loginTextContainer}>
          <Text style={{marginTop: 25,
          textAlign: 'center'}}> Already have an account?
            <Text 
              style={[styles.loginText, styles.loginLink]}
              onPress={() => this.props.navigation.navigate('Login')}> Login
            </Text>  
          </Text>
        </View>                       
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
backgroundColor: "#3740FE",
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
}
});






