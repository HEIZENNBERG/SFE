import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-swiper-flatlist';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../database/firebase';
const repTreatment = ({
    onClose, 
    report, 
    reporter,
    reportId
}) => {
console.log(reportId);

  const reporterTreated = report.status === 'closed' && !report.TreatAction;
  const HSEtreating = report.status === 'open';
  const reportTreated = report.status === 'closed' && report.TreatAction;
  const [treatAction , setTreatAction] = useState('');
  const [imageTreat1, setImageTreat1] = useState('');
  const [imageTreat2, setImageTreat2] = useState('');
  const [imageTreat3, setImageTreat3] = useState('');
  const images = [report.image1, report.image2, report.image3].filter(Boolean);

  const treatImages = [report.treatImage1, report.treatImage2, report.treatImage3].filter(Boolean);
  const date = new Date(report.date.seconds * 1000); 
  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });


  const handleReport = async () => {

    if (treatAction ===""  ) {
    Alert.alert('Error 404', 'All fields are required');
    console.log('Error 404', 'All fields are required');
    } else {
    try {
      let download1 = "";
      let download2 = "";
      let download3 = "";

      const treatmentRef = firebase.firestore().collection('reports').doc(reportId);
      if (imageTreat1) {

        const response1 = await fetch(imageTreat1);
        const blob1 = await response1.blob();
        const storageRef1 = firebase.storage().ref().child(`ReportPics/${Math.floor(Math.random() * 1000)}`);
        await storageRef1.put(blob1);
        download1 = await storageRef1.getDownloadURL();

      }

      if (imageTreat2) {
        const response2 = await fetch(imageTreat2);
        const blob2 = await response2.blob();
        const storageRef2 = firebase.storage().ref().child(`ReportPics/${Math.floor(Math.random() * 1000)}`);
        await storageRef2.put(blob2);
        download2 = await storageRef2.getDownloadURL();
      }

      if (imageTreat3) {
        const response3 = await fetch(imageTreat3);
        const blob3 = await response3.blob();
        const storageRef3 = firebase.storage().ref().child(`TreatmentReportPics/${Math.floor(Math.random() * 1000)}`);
        await storageRef3.put(blob3);
        download3 = await storageRef3.getDownloadURL();
      }
      if(download1 ==="" && download2 ==="" && download3 =="")
      {    
        Alert.alert('Error 404', 'picuters are necessary');
        console.log('Error 404', 'picuters are necessary');
        }else{
          treatmentRef.set({
            TreatAction: treatAction,
            treatImage1: download1,
            treatImage2: download2,
            treatImage3: download3,
            status: 'closed',
          }, { merge: true });

        Alert.alert('Report submited successfully!');
        console.log('Report submited successfully!')
        setTreatAction('');
        setImageTreat1('');
        setImageTreat2('');
        setImageTreat3('');
      }


  } catch (error) {
    Alert.alert('Error', error.message);
    console.log(error.messag)
    }
  
  };
}
  const pickImage1 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
    });
  
    if (!result.canceled) {
        setImageTreat1(result.assets[0].uri);
    }else {
      setImageTreat1(null);
    }
  };
  
  const pickImage2 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
    });
  
    if (!result.canceled) {
        setImageTreat2(result.assets[0].uri);
    }else {
      setImageTreat2(null);
    }
  };
  const pickImage3 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
    });
  
    if (!result.canceled) {
        setImageTreat3(result.assets[0].uri);
    }else {
      setImageTreat3(null);
    }
  };
  let graviteColor ;
  switch (report.gravite) {
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


  return (
    <ScrollView style={styles.container}>
    <TouchableOpacity style={styles.closeBTN} onPress={onClose}>
      <Ionicons name="close" size={24} color="gray" />
    </TouchableOpacity>  

    <Text style={{marginTop: 20, fontWeight : '600'}}>Reported By : </Text>
    <View style={styles.infoBar}> 
      <Image  style={{        
          padding : 1,
          margin : 5,
          width: 50, 
          height: 50, 
          borderRadius: 30 }} 
            source={reporter.image ? { uri: reporter.image } : require('../../src/images/profilPic.png')}
        />
        <View style={styles.infoText}>
          <Text style={{fontWeight : '700', marginTop : 10, color :"#fff"}}>{reporter.firstName} {reporter.lastName}</Text>
          <Text style={{fontSize :10 , marginTop: 5, color :"#fff"}}>Num : {reporter.number}</Text>
        </View>
      </View>
      <View style={styles.generalInfo}>
        <Text style={{fontWeight : '600', textAlign:'center', marginBottom : 15, fontSize :16, color :"#2b72ff"}}>General Informations</Text>
        <Text style={styles.subInfoTitle}>Service :</Text>
        <Text style={styles.subInfo}>{report.service}</Text>
        <Text style={styles.subInfoTitle}>Emplacement :</Text>
        <Text style={styles.subInfo}>{report.emplacement}</Text>
        <Text style={styles.subInfoTitle}>Site :</Text>
        <Text style={styles.subInfo}>{report.site}</Text>
        <Text style={styles.subInfoTitle}>Date :</Text>
        <Text style={styles.subInfo} >{formattedDate}</Text>
      </View>
      <View>
        <Text style={{fontWeight : '600', marginBottom : 15, textAlign:'center', fontSize :16, color :"#2b72ff"}}>Report details</Text>

          <Text style={styles.subInfoTitle}>Report Type : </Text>
          <Text style={styles.subInfo}>{report.type}</Text>

          <Text style={styles.subInfoTitle} >{report.type} Type : </Text>
          <Text style={styles.subInfo}>{report.subType}</Text>
          <View style={{       
             flexDirection: 'row',
              marginTop:2.5,
              borderBottomWidth : 1,
              borderBottomColor : "#cccc",
              marginBottom:2,
              paddingLeft : 10,
              paddingBottom:10,
              }}>
          
          <Text style={styles.subInfoTitle}>{report.type} Gravity : </Text>
          <MaterialIcons name="report-problem" size={15} color={graviteColor} />
          <Text style={{marginLeft : 5}}>{report.gravite}</Text>
          </View>
          <View style={{marginTop : 10, height: 400}}>
          <Text style={styles.subInfoTitle}>Images before : </Text>
          {images.length > 0 && (
            <ScrollView horizontal>
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
                 </ScrollView> 
                )}
                </View>
          <Text style={styles.subInfoTitle}>Report description : </Text>
          <Text style={styles.subInfo}>{report.description}</Text>
          <Text style={styles.subInfoTitle}>Satuts : </Text>
          <Text style={styles.subInfo}>{report.status}</Text>
      </View>
      <View>
        <Text style={{fontWeight : '600', marginBottom : 15, textAlign:'center', fontSize :16, color :"#2b72ff"}}>Report Treatment</Text>

        {reporterTreated &&(
          <View style={styles.last}> 
          <Text style={{textAlign : 'center'}}>this Report was Closed By the reporter</Text>
        </View>)}

         {reportTreated &&(             
        <View style={styles.last}>
        <Text style={styles.subInfoTitle}>Images After : </Text>
        {treatImages.length > 0 && (
            <ScrollView horizontal>
                  <Swiper >
                    {treatImages.map((TreatImage, index) => (
                      <Image
                      resizeMode='cover'
                        key={index}
                        style={styles.reportPics}
                        source={{ uri: TreatImage }}
                      />
                    ))}
                  </Swiper>
                 </ScrollView> 
                )}
                <Text style={styles.subInfoTitle}>Treatment actions : </Text>
          <Text style={styles.subInfo}>{report.TreatAction}</Text>
          </View>
          )}


          {HSEtreating &&(
            <View style={styles.last}>
        <SafeAreaView>
          <TextInput
          editable
              multiline={true}
              numberOfLines={6}
              style={styles.inputStyle}
              placeholder="Treatment Actions"
              value={treatAction}
              onChangeText={(val) => setTreatAction(val)} 
          />
        </SafeAreaView>
          <Text style={styles.subInfoTitle}>Upload pictures after : </Text>

          <View style={styles.AddImagesContainer}>
          <Text style={styles.radioText}></Text>
            <View style={styles.uploadImages}>
                <View style={styles.imageConatainer}>
                    <FontAwesome5 name="image" size={40} color="#777777"  onPress={pickImage1}/>
                </View>
                <View style={styles.imageConatainer}>
                    <FontAwesome5 name="image" size={40} color="#777777"  onPress={pickImage2}/>
                </View>           
                <View style={styles.imageConatainer}>
                    <FontAwesome5 name="image" size={40} color="#777777"  onPress={pickImage3}/>
                </View>
              </View>
              <View style={styles.imagesUrl}>
                <Text numberOfLines={1} ellipsizeMode='tail'>{imageTreat1}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail'>{imageTreat2}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail'>{imageTreat3}</Text>
              </View>
              
            </View> 

            <View style={styles.button}>
          <Button
            title="Submit"
            onPress={handleReport}
          />
          </View>
          </View>)}
      </View>
    </ScrollView>
  )
}

export default repTreatment
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      padding: 20,
      elevation: 5,
      paddingBottom: 50,
  },
  closeBTN: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  infoBar:{
    margin: 5, 
    height :'auto',
    borderRadius : 15,
    marginBottom : 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    backgroundColor:"#2b72ff",
  },
  generalInfo:{
    margin: 5, 
    height :'auto',
    borderRadius : 15,
    marginBottom : 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    backgroundColor : "#ffff",
    padding : 5,
  },
  subInfo :{
    borderBottomWidth : 1,
    borderBottomColor : "#cccc",
    marginBottom: 8,
    paddingLeft : 10,
    paddingBottom:10,
  },
  subInfoTitle:{
    fontWeight : '500', 
    marginLeft : 10,
    textTransform: 'capitalize',
  },
  reportPics : {
    margin : 15,
     width: 350, 
     height : 350,
     borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
  },
  AddImagesContainer:{
    height : 200,
    margin : 35,
    borderWidth : 1,
    backgroundColor : '#f3f3f3',
    borderRadius : 10,
    marginTop : 15,
    borderColor : '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  uploadImages:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:15,
    
  },
  button:{
    marginBottom : 90,
    marginLeft :100,
    marginRight : 100,
  
  },
  last:{
    marginBottom: 30,
  },
  imageConatainer:{
    width : '20%',
    paddingTop: 12,
    paddingBottom:5,
    alignItems: 'center',
    borderWidth : 1,
    backgroundColor : '#fff',
    borderRadius : 10,
    marginTop : 15,
    marginLeft : 15,
    marginRight : 15,
    borderColor : '#ffff',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  radioText:{
    marginTop : 15 , 
    color : 'blue',
    marginLeft:10,
  },
  imagesUrl:{
    marginLeft : 35,
    marginRight : 35,
    lineHeight : 50,
    height:85,
  },
  inputStyle: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor:'#f2f2f2',
    marginLeft : 35,
    marginRight : 35,
    marginTop : 15,

},
})