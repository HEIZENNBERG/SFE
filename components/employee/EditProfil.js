// import React, {useState, useEffect} from 'react';
// import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesom from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import BottomSheet from 'reanimated-bottom-sheet';
// import Animated from 'react-native-reanimated';
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
 
// export default function EditProfil() {

//     const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//     const renderInner = () => (
//         <View style={styles.panel}>
//             <View style={{alignItems: 'center',}}>
//                 <Text style={styles.panelTitle}>Upload Photo</Text>
//                 <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
//             </View>
//             <TouchableOpacity style={styles.panelButton}>
//                 <Text style={styles.panelButtonTitle}>Take Photo</Text>  
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
//                 <Text style={styles.panelButtonTitle}>Choose from Library</Text>  
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.panelButton} onPress={() => sheetRef.current.snapTo(1)}>
//                 <Text style={styles.panelButtonTitle}>Cancel</Text>  
//             </TouchableOpacity>
//         </View>
//     );

//     const renderHeader = () => (
//         <View style={styles.header}>
//             <View style={styles.panelHeader}>
//                 <View style={styles.panelHandle} /> 
//             </View>
//         </View>
//     );  

//     const sheetRef = React.useRef(null);
//     const fall = new Animated.Value(1);

//     return (
//         <View style={styles.container}>
//             <BottomSheet
//                 ref={sheetRef}
//                 snapPoints= {[330, 0]}
//                 renderContent= {renderInner }
//                 renderHeader= {renderHeader}
//                 initialSnap= {1}
//                 callbackNode= {fall}
//                 enabledGestureInteraction= {true}
//             />
//             <Animated.View style={{margin: 20, opacity: Animated.add(0.2, Animated.multiply(fall, 1.0))}}>
//                 <View style={{alignItems: 'center'}}>
//                     <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
//                         <View style={{height: 100, width: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center',}}>
//                            {image && <ImageBackground source={{ uri: image }} style={{height: 100, width: 100,}} imageStyle={{borderRadius: 15}} >
//                                 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
//                                     <Icon name="camera" size={35} color="#fff" style={{opacity: 0.7, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10,}} />
//                                 </View>    
//                             </ImageBackground> }
//                         </View>
//                     </TouchableOpacity>
//                     <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>K.Nirushana</Text>
//                 </View>

//                 <View style={{marginTop: 40,}}>
//                     <View style={styles.action}>
//                         <FontAwesom name="user-o" size={20} />
//                         <TextInput placeholder="First Name" placeholderTextColor="#666666" style={styles.textInput} />
//                     </View>

//                     <View style={styles.action}>
//                         <FontAwesom name="user-o" size={20} />
//                         <TextInput placeholder="Last Name" placeholderTextColor="#666666" style={styles.textInput} />
//                     </View>

//                     <View style={styles.action}>
//                         <Feather name="phone" size={20} />
//                         <TextInput placeholder="Phone Number" placeholderTextColor="#666666" keyboardType="number-pad" style={styles.textInput} />
//                     </View>

//                     <View style={styles.action}>
//                         <FontAwesom name="envelope-o" size={20} />
//                         <TextInput placeholder="Email" placeholderTextColor="#666666" keyboardType="email-address" style={styles.textInput} />
//                     </View>

//                     <View style={styles.action}>
//                         <FontAwesom name="globe" size={20} />
//                         <TextInput placeholder="Country" placeholderTextColor="#666666" style={styles.textInput} />
//                     </View>

//                     <View style={styles.action}>
//                         <Icon name="map-marker-outline" size={20} />
//                         <TextInput placeholder="City" placeholderTextColor="#666666" style={styles.textInput} />
//                     </View>

//                 </View>
//                 <TouchableOpacity style={styles.commandButton} onPress={() => {}} >
//                     <Text styles={styles.panelButtonTitle}>Submit</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     commandButton: {
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: '#FF6347',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     panel: {
//         padding: 20,
//         backgroundColor: '#FFFFFF',
//         paddingTop: 20,
//         // borderTopLeftRadius: 20,
//         // borderTopRightRadius: 20,
//         // shadowColor: '#000000',
//         // shadowOffset: {width: 0, height: 0},
//         // shadowRadius: 5,
//         // shadowOpacity: 0.4,
//     },
//     header: {
//         backgroundColor: '#FFFFFF',
//         shadowColor: '#333333',
//         shadowOffset: {width: -1, height: -3},
//         shadowRadius: 2,
//         //elevation: 5,
//         paddingTop: 10,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//     },
//     panelHeader: {
//         alignItems: 'center',
//     },
//     panelHandle: {
//         width: 40,
//         height: 4,
//         borderRadius: 4,
//         backgroundColor: '#00000040',
        
//     },
//     panelTitle: {
//         fontSize: 27,
//         height: 35,
//     },
//     panelSubtitle: {
//         fontSize: 14,
//         color: 'gray',
//         height: 30,
//         marginBottom: 30,
//     },
//     panelButton: {
//         padding: 12,
//         borderRadius: 10,
//         backgroundColor: '#FF6347',
//         alignItems: 'center',
//         marginVertical: 7,
//     },
//     panelButtonTitle: {
//         fontSize: 17,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 15,
//         marginBottom: 10,
//         borderBottomWidth: 2,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5,
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5,
//     },
//     textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         paddingLeft: 10,
//         color: '#05375a',
//         left: 7
//     },
// });
