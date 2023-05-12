    import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native'
    import React, { useState, useEffect } from 'react';
    import firebase from '../../database/firebase';
    import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
    import Swiper from 'react-native-swiper';






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
      const [expanded, setExpanded] = useState(false);


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
            let graviteColor ;
            switch (item.gravite) {
              case 'LOW' :
                graviteColor = "#e3c900";
                break;
              case 'MEDIUM' :
                graviteColor = "#d57d00";
                break;
              case 'HIGH' :
                graviteColor = "#bb2124";
                break;
            }


            const images = [item.image1, item.image2, item.image3].filter(Boolean);
            const user = users[item.user] || {};
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
            <View style={{ 
              height: expanded ? 'auto' : 500,       
              borderRadius : 15,
              border : 1,
              justifyContent: 'center',
              display:'flex',
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              margin:10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.7,
              shadowRadius: 5,}}>
              <View style={styles.infoBar}> 
                <Image  style={{        
                  borderColor :graviteColor,
                  borderWidth : 3,
                  padding : 1,
                  margin : 5,
                  width: 50, 
                  height: 50, 
                  borderRadius: 30 }} 
                    source={user.image ? { uri: user.image } : require('../../src/images/profilPic.png')}
                  />
                <View style={styles.infoText}>
                  <Text style={{fontWeight : '700'}}>{user.firstName} {user.lastName}</Text>
                  <Text style={{fontSize :10 , marginTop: 5}}>{formattedDate}</Text>
                </View>
              </View>

              <View style={styles.body}>

              <View style={styles.location}>
                  <MaterialIcons name="report-problem" size={15} color={graviteColor} />
                  <Text style={{marginLeft : 5}}>{item.type} : {item.subType}</Text>
                </View>

                <View style={styles.location}>
                  <Entypo name="location" size={15} color='#2b72ff' />
                  <Text style={{marginLeft : 5}}>{item.emplacement} ({item.site})</Text>

                </View>
                <View style={styles.location}>
                  <AntDesign name="setting" size={15} color='#2b72ff' />
                  <Text style={{marginLeft : 5}}>{item.service}</Text>
                </View>
                
                {expanded && (  
                  <View>
                  <Text style={{ marginTop: 3, paddingLeft: '20%' }}>
                    <Text style={{ fontWeight: '500' }}>Status :</Text> {item.status} / <Text style={{ fontWeight: '500' }}>Gravity :</Text> {item.gravite}
                  </Text>
                    <Text style={{fontWeight : '500', marginTop: 3}}>description :</Text><Text>{item.description}</Text>
                    <Text style={{color:'#2b72ff'}} onPress={() => setExpanded(expanded => !expanded)}>See less ...</Text>
                  </View>
                )}
                {!expanded &&(
                <Text style={{color:'#2b72ff'}} onPress={() => setExpanded(expanded => !expanded)}>See More ...</Text>
                )}
                  {images.length > 0 && (
                <Swiper >
                  {images.map((image, index) => (
                    <Image
                    resizeMode='cover'
                      key={index}
                      style={styles.reportPics}
                      source={{ uri: image }}
                    />
                  ))}
                </Swiper>
              )}
              </View>
            </View>
            );
          }}
        />

      );}
    }
    
    export default Risks

    const styles = StyleSheet.create({
      infoBar:{
        margin: 5, 
        marginBottom : 15,
        flexDirection: 'row',
        height : 50,
        top : 0,
      },
      infoText : {
        paddingTop : 8,
      },
      profilPic:{

      },  
      body:{
        height : 50,
        display : 'flex',
        flex : 1,
        fontSize: 10,
      },
      location : {
        flexDirection: 'row',
        marginTop:2.5,
        marginBottom:2,
  
      },
      reportPics : {
        margin : 15,
         width: '100%', 
         height:'100%',
         borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center',
      }
    });
