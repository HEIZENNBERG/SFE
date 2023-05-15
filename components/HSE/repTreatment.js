import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import {MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const repTreatment = ({
    onClose, 
    report, 
    reporter
}) => {


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
const images = [report.image1, report.image2, report.image3].filter(Boolean);
  const date = new Date(report.date.seconds * 1000); 
  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <ScrollView style={styles.container}>
    <Text style={{fontWeight : 500, fontSize : 22,}}>Report</Text>
    <TouchableOpacity style={styles.closeBTN} onPress={onClose}>
      <Ionicons name="close" size={24} color="gray" />
    </TouchableOpacity>  

    <Text>Created By : </Text>
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
                  <Swiper >
                    {images.map((image, index) => (
                      <Image
                      resizeMode='contain'
                        key={index}
                        style={styles.reportPics}
                        source={{ uri: image }}
                      />
                    ))}
                  </Swiper>
                )}
                </View>
          <Text style={styles.subInfoTitle}>Report description : </Text>
          <Text style={styles.subInfo}>{report.description}</Text>
      </View>
                  
    </ScrollView>
  )
}

export default repTreatment
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      elevation: 5,
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
     width: '100%', 
     height:300,
     borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
  }

})