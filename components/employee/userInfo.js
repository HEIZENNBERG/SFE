import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import firebase from '../../database/firebase';

const userInfo = (route) => {

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

    return user ? user : {}; 
}


export default userInfo