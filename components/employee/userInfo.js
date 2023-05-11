import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import firebase from '../../database/firebase';

const userInfo = (userId) => {

    const [user, setUser] = useState(null);
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

    useEffect(() => {
      
      const ref = firebase.firestore()
        .collection('workers')
        .doc(userId)
        .onSnapshot(documentSnapshot => {
          setUser(documentSnapshot.data());
        });
  
      return () => ref();
    }, []);

    return user ? user : {}; 
}


export default userInfo