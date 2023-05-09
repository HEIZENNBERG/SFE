import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, Modal, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../database/firebase';
import EditProfil from './EditProfil';



const Profil = ({ route, navigation }) => {



  const logout = () => {
    firebase.auth().signOut()
      .then(() => navigation.navigate('Login'))
      .catch(error => console.log(error));
  };



  const handleEditProfilePress = () => {
    setIsEditProfileModalVisible(true);
  };

  const handleEditProfileModalClose = () => {
    setIsEditProfileModalVisible(false);
  };
  const [user, setUser] = useState(null);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
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
        
        <SafeAreaView style={styles.container}>
            <ScrollView> 
            <View style={styles.userInfoSection}>
                <View style={{ alignItems: 'center',marginBottom: 30, backgroundColor:'#2b72ff', borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15, 
                  height : 225,

                  }}>
                <Avatar.Image 
                source={user?.image ? { uri: user.image } : require('../../src/images/profilPic.png')}
                size={80}
                style={{ marginTop: 80 }} 
                />

                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {marginTop: 15, marginBottom: 5, color : '#fff', marginLeft:-10}]}>{user?.firstName} {user?.lastName}</Title>
                    </View>
                </View>

                <View style={[styles.userInfoSection, {marginTop: '10%', marginLeft: '-10%', alignItems: 'center'}]}>
                <View style={styles.row}>
                        <Icon name="account" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 30}}>{user?.firstName} {user?.lastName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 30}}>{user?.number}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{color: '#777777', marginLeft: 30}}>{user?.email}</Text>
                    </View>
                </View>
                <View style={styles.bottomButtons}>
                <Button title="Log Out" onPress={() => {logout()}} />             
                <Button title="Edit Profile" onPress={() => {handleEditProfilePress()}} />
                
                </View>
            </View>
            <Modal visible={isEditProfileModalVisible} animationType="slide"  transparent={true}>
                <EditProfil onClose={handleEditProfileModalClose}
                firstNameRef={user?.firstName}
                lastNameRef={user?.lastName}
                numberRef={user?.number}
                imageRef={user?.image}
                />
            </Modal> 
          
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      height: 40,
      width : 250,
      paddingHorizontal: 10,
      marginBottom: 25,
      marginLeft:50,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    bottomButtons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 50,
      marginBottom: 50,
    },
    infoBoxWrapper: {
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        borderTopColor: '#777777',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 5,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});

export default Profil;
