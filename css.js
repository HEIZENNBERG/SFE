


// components/Profil.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../../database/firebase';
export default class Profil extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, user {this.state.displayName}
        </Text>
        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'zzz
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
}); */



********************************************************



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firebase from '../../database/firebase';




const Profil = ({ route }) => {
  const [user, setUser] = useState(null);
  const userId = firebase.auth().currentUser.uid;
  
  useEffect(() => {

    const ref = firebase.firestore()
      .collection('workers')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data());
      });

    return () => ref();
  }, [route]);

  return (
    <View style={styles.container}>
      <Image
    source={{ uri: 'https://via.placeholder.com/150' }}
    style={styles.profileImage}
  />

      <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.number}>{user?.number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  number: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Profil;
