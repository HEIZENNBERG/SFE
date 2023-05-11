    import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native'
    import React, { useState, useEffect } from 'react';
    import firebase from '../../database/firebase';
    import { Entypo, AntDesign } from '@expo/vector-icons';


    const userInfo = async (userId , setUsers) => {
      try {
        const userRef = firebase.firestore().collection('workers').doc(userId);
        const doc = await userRef.get();
        if (doc.exists) {
          const userData = doc.data();
          setUsers(prevUsers => ({...prevUsers, [userId]: userData}));          
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };



    const Risks = () => {
      
      const [loading, setLoading] = useState(true); 
      const [reports, setReport] = useState([]); 
      const [users, setUsers] = useState({});


      useEffect(() => {
        const subscriber = firebase.firestore()
          .collection('reports')
          .onSnapshot(querySnapshot => {
            const reports = [];
      
            querySnapshot.forEach(documentSnapshot => {
              reports.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setReport(reports);
            setLoading(false);
          });
      
        return () => subscriber();
      }, []);

      useEffect(() => {
        reports.forEach(item => {
          if (!users[item.user]) {
            userInfo(item.user, setUsers);
          }
        });
      }, [reports]);


      if(!loading){
      return (
        <FlatList
          data={reports}
          style={{marginBottom : 75}}
          renderItem={({ item }) => { 


            const user = users[item.user] || {};
            userInfo(item.user);

            const date = new Date(item.date.seconds * 1000); 
            const formattedDate = date.toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });

            console.log(user)
            return(
            <View style={styles.container}>
              <View style={styles.infoBar}> 
                <Image  style={styles.profilPic} 
                    source={user.image ? { uri: user.image } : require('../../src/images/profilPic.png')}
                  />
                <View style={styles.infoText}>
                  <Text>{user.firstName} {user.lastName}</Text>
                  <Text style={{fontSize :10 , marginTop: 5}}>{formattedDate}</Text>
                </View>
              </View>

              <View style={styles.body}>
                <View style={styles.location}>
                  <Entypo name="location" size={15} color="black" />
                  <Text style={{marginLeft : 5}}>{item.emplacement} ({item.site})</Text>

                </View>
                <View style={styles.location}>
                  <AntDesign name="setting" size={15} color="black" />
                  <Text style={{marginLeft : 5}}>{item.service}</Text>
                </View>
                  <Text>See More ...</Text>
              </View>
            </View>
            );
          }}
        />

      );}
    }
    
    export default Risks

    const styles = StyleSheet.create({
      container: {
        height : 250,
        borderRadius : 15,
        border : 1,
        justifyContent: 'center',
        
        padding: 5,
        margin:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
      infoBar:{
        margin: 5,  
        flexDirection: 'row',
        height : 50,
        top : 0,
      },
      infoText : {
        marginLeft : 10,
        paddingTop : 5,
      },
      profilPic:{
        margin : 5,
        width: 40, 
        height: 40, 
        borderRadius: 30 
      },  
      body:{
        height : 50,
        display : 'flex',
        flex : 1,
        fontSize: 10,
        marginLeft : 10,
      },
      location : {
        flexDirection: 'row',
      },

    });
