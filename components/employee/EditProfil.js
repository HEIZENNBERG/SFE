import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity,TouchableWithoutFeedback, Avatar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';

const EditProfil = ({onClose,
    firstNameRef,
    lastNameRef,
    numberRef,
    imageRef
}) => {
    const [firstName, setFirstName] = useState(firstNameRef);
    const [lastName, setLastName] = useState(lastNameRef);
    const [number, setNumber] = useState(numberRef);
    const [image, setImage] = useState(imageRef);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const handleSave = async () => {
      const userRef = firebase.firestore().collection('workers').doc(firebase.auth().currentUser.uid);
      if (image !== imageRef) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref().child(`ProfilPictures/${firebase.auth().currentUser.uid}.jpg`);
        await storageRef.put(blob);
        const downloadURL = await storageRef.getDownloadURL();
        await userRef.update({
          firstName : firstName,
          lastName : lastName,
          number: number,
          image: downloadURL,
        });
      }else{
        await userRef.update({
          firstName : firstName,
          lastName : lastName,
          number: number,
        });
      }
      


      
        onClose();
      };
      
    return (
      <View style={styles.container}>
  <TouchableOpacity style={styles.closeBTN} onPress={onClose}>
    <Ionicons name="close" size={24} color="gray" />
  </TouchableOpacity>        
    <Text style={styles.title}>Edit Profile</Text>
    <TouchableWithoutFeedback onPress={pickImage}>
                        <View style={styles.imageContainer}>
                        <Image  source={image ? { uri :image } : require('../../src/images/profilPic.png')}
                                 style={styles.image}/>

                            <View style={styles.imageButton}>
                                <Text style={styles.imageButtonText}>Change Image</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
        <View style={styles.inputContainer}>
            <TextInput
            placeholder='First Name'
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
            style={styles.input}
            />
            <TextInput
            placeholder='Last Name'
            value={lastName}
            onChangeText={(value) => setLastName(value)}
            style={styles.input}
            />
            <TextInput
            placeholder='Phone Number'
            value={number}
            onChangeText={(value) => setNumber(value)}
            keyboardType="phone-pad"
            style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems : 'center',
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 32,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom : 50,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    inputContainer: {
      width: '100%',
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 20,
    },
    closeBTN: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#999',
        overflow: 'hidden',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageButton: {
        backgroundColor: '#999',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        position: 'absolute',
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
  });
  
  
  export default EditProfil;