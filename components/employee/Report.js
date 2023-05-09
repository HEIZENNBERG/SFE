import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Alert } from 'react-native';
import firebase from '../../database/firebase';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import userInfo from './userInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, Entypo, AntDesign, FontAwesome5  } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

const Report = (props) => {

  const [service, setService] = useState('');
  const [site, setSite] = useState('');
  const [gravite, setGravite] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [type, setType] = useState('');
  const [images, setImages] = useState([]);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [pickerValue , setPickerValue] = useState('');
  const user = userInfo();

  const [pickerOptions, setPickerOptions] = useState([
    { label: 'Select the report type ', value: '' },
    { label: 'remonte', value: 'remonte' },
    { label: 'incident', value: 'incident' },
    { label: 'accident', value: 'accident' }
  ]);

  const updateInput = (val, prop) => {
    switch (prop) {
      case 'service':
        setService(val);
        break;
      case 'site':
        setSite(val);
        break;
      case 'gravite':
        setGravite(val);
        break;
      case 'emplacement':
        setEmplacement(val);
        break;
      case 'type':
        setType(val);
        if (val === 'remonte') {
          setPickerOptions([
            { label: 'Select a specific Remonte', value: '' },
            { label: 'Produits chimiques', value: 'Produits chimiques' },
            { label: 'Biologique (Legionellose)', value: 'Biologique (Legionellose)' },
            { label: 'Hygiene', value: 'Hygiene' },
            { label: 'Amiante', value: 'Amiante' },
            { label: 'T° cryogeniques', value: 'T° cryogeniques' },
            { label: 'Machines tournantes', value: 'Machines tournantes' },
            { label: 'T° hautes', value: 'T° hautes' },
            { label: 'Pression', value: 'Pression' },
            { label: 'Electricite / Foudre', value: 'Electricite / Foudre' },
            { label: 'Bruit / Vibrations', value: 'Bruit / Vibrations' },
            { label: 'P C B', value: 'P C B' },
            { label: 'Radiations', value: 'Radiations' },
            { label: 'Eclairage & visualisation', value: 'Eclairage & visualisation' },
            { label: 'Sol glissant & Deplacements', value: 'Sol glissant & Deplacements' },
            { label: 'Non - Degagement des acces', value: 'Non - Degagement des acces' },
            { label: 'Travailleur isole', value: 'Travailleur isole' },
            { label: 'Ambiance climatique', value: 'Ambiance climatique' },
            { label: 'Manutention mecanique', value: 'Manutention mecanique' },
            { label: 'Charge en hauteur / Chute d objet', value: 'Charge en hauteur / Chute d objet' },
            { label: 'Travaux en hauteur', value: 'Travaux en hauteur' },
            { label: 'Manutention manuelle	Circulation routiere', value: 'Manutention manuelle	Circulation routiere' },
            { label: 'Specifique à l accueil des personnes', value: 'Specifique à l accueil des personnes' },
            { label: 'Specifique au site ', value: 'Specifique au site ' },
            { label: 'Humain d ordre psychologique & physique', value: 'Humain d ordre psychologique & physique' },
          ]);
        } else if (val === 'incident') {
          setPickerOptions([
            { label: 'Select a specific Incident', value: '' },
            { label: 'Corporel', value: 'Corporel' },
            { label: ' Matériel', value: ' Matériel' },
            { label: 'Environnemental', value: 'Environnemental' }
          ]);
        } else if (val === 'accident') {
          setPickerOptions([
            { label: 'Select a specific Accident', value: '' },
            { label: 'ATAA', value: 'ATAA' },
            { label: 'ATPA', value: 'ATPA' },
            { label: 'ATSA', value: 'ATSA' },
            { label: '1erS', value: '1erS' },
            { label: 'PrAT', value: 'PrAT' },
          ]);
        } 
        break;
      case 'remonte':
        setRemonte(val);
        break;
      case 'pickerValue':
        setPickerValue(val);
          break;  
      case 'incident':
        setIncident(val);
        break;
      case 'accident':
        setAccident(val);
        break;
      case 'image':
        setImage(val);
        break;
      case 'date':
        setDate(val);
        break;
      case 'description':
        setDescription(val);
        break;
      case 'status':
        setStatus(val);
        break;
      default:
        break;
    }
  };


  const handleReport = async () => {


    if (service==="" || site==="" || gravite==="" || emplacement==="" || type==="" || pickerValue==="" || description==="" || status==="" ) {
    Alert.alert('Error', 'All fields are required');
    } else {
    try {

      
    //const response = await fetch(images[0]);
    // const blob = await response.blob();
    // const ref = firebase.storage().ref().child(`reports/${user.uid}/SOR/${new Date().toISOString()}`);
    // await ref.put(blob);

    //const downloadUrl = await ref.getDownloadURL();



    const ReportRef = firebase.firestore().collection('reports');
    ReportRef.add({
      service : service,
      site : site,
      gravite : gravite,
      emplacement : emplacement, 
      type : type,
      subType : pickerValue,
      description : description,
      status : status,
      date : date,
      user: firebase.auth().currentUser.uid,
    })
    .then(() => {
      Alert.alert('Report submited successfully!');
      console.log('Report submited successfully!')
        setService('');
        setSite('');
        setGravite('');
        setEmplacement('');
        setType('');
        setPickerValue('');
        setDescription('');
        setStatus('');
    })
    .catch(error => {
      console.error('Error creating worker: ', error);
      this.setState({ 
        isLoading: false, 
        errorMessage: error.message 
      });
    });





  } catch (error) {
    Alert.alert('Error', error.message);
    }
  
  };

  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 1,
  //     selectionLimit: 3,
  //   };
  //   ImagePicker.launchImageLibraryAsync(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }else {
  //       const images = [...images, ...response.assets.map((asset) => asset.uri)];
  //       setImages(images);
  //     }
  //   });
  };



    return (
      <SafeAreaView style={styles.container}>
        <ScrollView> 
          <Text  style={styles.heading} >Report</Text>
          <Text  style={styles.part1} >General Informations</Text>

          <View style={styles.row}>
          <AntDesign name="setting" size={25} color="#777777" />
            <Picker 
              style = {styles.pickerContainer}
              selectedValue={service}
              onValueChange={(itemValue) => updateInput(itemValue, 'service')
              }>
              <Picker.Item label="Select a Service" value="" color='red' />
              <Picker.Item label="Service Sécurité" value="Service Sécurité" />
              <Picker.Item label="RVBE-Atelier ENGIN" value="RVBE-Atelier ENGIN" />
              <Picker.Item label="RVBE-Broyeur, Nettoyeur, Cisaille" value="RVBE-Broyeur, Nettoyeur, Cisaille" />
              <Picker.Item label="Service Déroulage" value="Service Déroulage" />
              <Picker.Item label="Direction Technique" value="Direction Technique" />
              <Picker.Item label="RV3-EAF LF" value="RV3-EAF LF" />
              <Picker.Item label="Engins et Matériels Roulants" value="Engins et Matériels Roulants" />
              <Picker.Item label="RVFM-Moyens Généraux" value="RVFM-Moyens Généraux" />
              <Picker.Item label="RVFM-Préparation Ferraille" value="Intitulé" />
              <Picker.Item label="RVFM-RECaEPTION FERRAILLE" value="RVFM-RECaEPTION FERRAILLE" />
              <Picker.Item label="Service Four" value="Service Four" />
              <Picker.Item label="Service Informatique" value="Service Informatique" />
              <Picker.Item label="Service Hygiène Qualité Sécurité et Environnement" value="Service Hygiène Qualité Sécurité et Environnement" />
              <Picker.Item label="Magasin (Consommable)" value="Magasin (Consommable)" />
              <Picker.Item label="Maintenance Automatisme & Instrumentations" value="Maintenance Automatisme & Instrumentations" />
              <Picker.Item label="Maintenance Electrique" value="Maintenance Electrique" />
              <Picker.Item label="Maintenance Hydrolique & Lubrification" value="Maintenance Hydrolique & Lubrification" />
              <Picker.Item label="Maintenance Mécanique" value="Maintenance Mécanique" />
              <Picker.Item label="Maintenance Utilité" value="Maintenance Utilité" />
              <Picker.Item label="Service Outillage" value="Service Outillage" />
              <Picker.Item label="Servaice Parc Auto" value="Servaice Parc Auto" />
              <Picker.Item label="Service Laminage" value="Service Laminage" />
              <Picker.Item label="Service Projets et Travaux Neufs" value="Service Projets et Travaux Neufs" />
              <Picker.Item label="RV3-ASU" value="RV3-ASU" />
              <Picker.Item label="RV3-automatisme" value="RV3-automatisme" />
              <Picker.Item label="RV3-BM" value="RV3-BM" />
              <Picker.Item label="RV3-Electrique" value="RV3-Electrique" />
              <Picker.Item label="RV3-MAINTENANCE MECANIQUE & Hydraulique" value="RV3-MAINTENANCE MECANIQUE & Hydraulique" />
              <Picker.Item label="IntService Ressources Humainesitulé" value="Intitulé" />


            
            </Picker>    
            </View>


            <View style={styles.row}>    
            <Icon name="factory" color="#777777" size={25} />
            <Picker
              style = {styles.pickerContainer}
              selectedValue={site}
              onValueChange={(itemValue) =>  updateInput(itemValue, 'site')
              }>
              <Picker.Item label="Select a Site" value="" color='red'/>              
              <Picker.Item label="RIVA 1" value="RIVA 1" />
              <Picker.Item label="RIVA 2" value="RIVA 2" />
              <Picker.Item label="RIVA 3" value="RIVA 3" />
              <Picker.Item label="ADMINISTRATION" value="ADMINISTRATION" />
            </Picker>
            </View>

            <View style={styles.row}> 
            <Entypo name="location-pin" size={25} color="#777777" /> 
            <Picker
              style = {styles.pickerContainer}
              selectedValue={emplacement}
              onValueChange={(itemValue) => updateInput(itemValue, 'emplacement')
              }>
                            <Picker.Item label="Select an Emplacement" value="" color='red'/>
              <Picker.Item label="AUXILIAIRES" value="AUXILIAIRES" />
              <Picker.Item label="CENTRALE HYD TRAIN LAMINAGE" value="CENTRALE HYD TRAIN LAMINAGE" />
              <Picker.Item label="ADMINISTRATION BATIMENT 2" value="ADMINISTRATION BATIMENT 2" />
              <Picker.Item label="ATELIER ELECTRIQUE" value="ATELIER ELECTRIQUE" />
              <Picker.Item label="ATELIER MECANIQUE" value="ATELIER MECANIQUE" />
              <Picker.Item label="ATELIER OUTILLAGE" value="ATELIER OUTILLAGE" />
              <Picker.Item label="ATELIER SOUDAGE" value="ATELIER SOUDAGE" />
              <Picker.Item label="CHARPENTE METALLIQUE" value="CHARPENTE METALLIQUE" />
              <Picker.Item label="LABO" value="LABO" />
              <Picker.Item label="LAMINOIR" value="LAMINOIR" />
              <Picker.Item label="MAGASIN" value="MAGASIN" />
              <Picker.Item label="PARC A BILLETTE" value="PARC A BILLETTE" />
              <Picker.Item label="SOUS-SOL" value="SOUS-SOL" />
              <Picker.Item label="TRAITEMENT DES EAUX" value="TRAITEMENT DES EAUX" />
              <Picker.Item label="ZONE EXPEDITION" value="ZONE EXPEDITION" />
              <Picker.Item label="THERMEX" value="THERMEX" />
              <Picker.Item label="TRAIN DE LAMINAGE" value="TRAIN DE LAMINAGE" />
              <Picker.Item label="FOUR" value="FOUR" />
              <Picker.Item label="TRAIN DEGROSSISSEUR" value="TRAIN DEGROSSISSEUR" />
              <Picker.Item label="TRAIN INTERMEDIAIRE" value="TRAIN INTERMEDIAIRE" />
              <Picker.Item label="TRAIN FINISSEUR" value="TRAIN FINISSEUR" />
            </Picker> 
            </View>

            <View style={styles.row}>
               <Icon name="account" color="#777777" size={25} />
                <Text style={styles.rowText}>{user.firstName} {user.lastName}</Text>
              </View>
              <View style={styles.row}> 
                <MaterialIcons name="date-range" size={25} color="#777777" />
                <Text style={styles.rowText}>{date.toLocaleDateString('en-GB')}</Text>
              </View>

            <Text  style={styles.part1} >Report details</Text>



            <View style={styles.type}>
              <RadioButton.Group
                onValueChange={(value) => updateInput(value, 'type')}
                value={type}
              >
                <Text style={styles.radioText}>Choose the type of the report :</Text>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="remonte" />
                  <Text style={styles.radioButtonLabel}>Remonte</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="incident" />
                  <Text style={styles.radioButtonLabel}>Incident</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton value="accident" />
                  <Text style={styles.radioButtonLabel}>Accident</Text>
                </View>
              </RadioButton.Group>
              {pickerOptions && (
                <Picker
                  style={styles.pickerOptionContainer}
                  selectedValue={pickerValue}
                  onValueChange={(itemValue) => {
                    updateInput(itemValue, 'pickerValue');
                      
                  }}
                >
                  {pickerOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              )}
            </View>



            <View style={styles.row}>  
            <AntDesign name="exclamationcircle" size={25} color="#777777" />
            <Picker
              style = {styles.pickerContainer}
              selectedValue={gravite}
              onValueChange={(itemValue) =>
                updateInput(itemValue, 'gravite')
              }>
                            <Picker.Item label="Select the Gravity" value="" color='red'/>
              <Picker.Item label="LOW" value="LOW" />
              <Picker.Item label="MEDIUM" value="MEDIUM" />
              <Picker.Item label="HIGH" value="HIGH" />
            </Picker>
              </View>

              <TextInput
                editable
                multiline
                numberOfLines={4}
            style={styles.inputStyle}
              placeholder="description"
              value={description}
              onChangeText={(val) => updateInput(val, 'description')} 
        />


            <View style={styles.imageConatainer}>
              <Text>Upload pictures (max 3)</Text>
              <FontAwesome5 name="images" size={40} color="#777777" />
              {images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.selectedImage} />
              ))}
            </View>



            <View style={styles.status}>
              <RadioButton.Group
                onValueChange={(value) => updateInput(value, 'status')}
                value={status}
              >
                <Text style={styles.radioText}>Status:</Text>
                <View style={styles.radioButtonRowContainer}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="open" />
                    <Text style={styles.radioButtonLabel}>Open</Text>
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="closed" />
                    <Text style={styles.radioButtonLabel}>Closed</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>

        <View style={styles.button}>
          <Button
            title="Submit"
            onPress={handleReport}
          />
        </View>
        </ScrollView>                      
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingVe: 35,
    
    backgroundColor: '#fff'
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
buttonContainer: {
backgroundColor: "#2b72ff",
borderRadius: 5,
height: 50,
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
marginTop: 20
},
part1:{
  height : 40,
  backgroundColor : '#2b72ff',
  color : '#fff',
  padding:10,
  textAlign : 'center',
  fontWeight : 'bold',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginTop : 30,
  marginBottom: 15,
},
buttonText: {
color: "#fff",
fontSize: 18,
fontWeight: "bold",
textTransform: "uppercase"
},
impostor:{
  height: 50,
  width: '80%' ,
  borderBottomColor : 'grey',
  borderBottomWidth : 1,
  borderColor : '#fff',
  marginLeft : 35,
  marginRight : 35,
  marginTop : 15,
  paddingHorizontal: 10,
},

radioButtonRowContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},
radioButtonContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flexBasis: '50%',
},
radioButtonLabel: {
  fontSize: 16,
},
radioText:{
  marginTop : 15 , 
  color : 'blue',
  marginLeft:10,
},
type:{
  borderWidth : 1,
  backgroundColor : '#f3f3f3',
  borderRadius : 10,
  margin : 35,
  borderColor : '#f3f3f3',
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
},
status:{
  borderWidth : 1,
  backgroundColor : '#ffff',
  borderRadius : 10,
  margin : 35,
  borderColor : '#f3f3f3',
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
},
imageConatainer:{
  alignItems : 'center',
  paddingTop : '12%',
  height : 150,
  borderWidth : 1,
  backgroundColor : '#f3f3f3',
  borderRadius : 10,
  margin : 35,
  borderColor : '#f3f3f3',
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
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

radioButtonContainer:{
  flexDirection: 'row',
  marginLeft : 35,
  marginRight : 35,
  marginTop : 15,
},
heading: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 30,
},
radioButtonLabel:{
  marginTop : 7,

},
button:{
  marginBottom : 90,
  marginLeft :100,
  marginRight : 100,
  marginTop : 15,
},
pickerOptionContainer:{
  backgroundColor : '#f3f3f3',
  marginBottom: 15,
  height: 50,
  width: '80%' ,
  borderBottomColor : 'grey',
  borderBottomWidth : 1,
  borderRadius: 10,
  marginLeft : 35,
  marginRight : 35,
  marginTop : 15,
  paddingHorizontal: 10,
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
},
Icon:{
  top: 10,
},
pickerContainer: {
  borderColor : '#fff',
  height : 30,
  width: '90%',
  marginLeft : 15,
},
row: {
      flexDirection: 'row',
      height: 45,
      width: '80%' ,
      paddingHorizontal: 6,
      marginLeft : 35,
      marginRight : 35,
      marginTop : 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccc',
    },
    rowText:{
      marginLeft :15,
    }
});


export default Report;



