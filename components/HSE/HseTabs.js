import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stat from './Stat';
import { StyleSheet, Text, View, } from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons';
import MainHse from './MainHse';

 
const Tab = createBottomTabNavigator();

function HseTabs({navigation}) {

    const logout = () => {
        firebase.auth().signOut()
          .then(() => navigation.navigate('Login'))
          .catch(error => console.log(error));
      };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#efebfd',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="MainHse"
        component={MainHse}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2 , marginBottom: 10}}>
            <FontAwesome name="home"  size={focused ? 36 : 30} color={focused ? '#2b72ff' : '#78778e'} />
 
              {focused && <Text style={{ color: '#2b72ff', fontSize: 12 }}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Stat"
        component={Stat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2, marginBottom: 10 }}>
                <AntDesign name="barschart" size={focused ? 36 : 30} color={focused ? '#2b72ff' : '#78778e'} />
              
              {focused && <Text style={{ color: '#2b72ff', fontSize: 12 }}>Statisctics</Text>}
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
    width: 0,
    height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    },
    focusedTab: {
    width: 40,
    height: 40,
    },
    focusedText: {
    color: '#2b72ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    }); 

    export  {HseTabs};
