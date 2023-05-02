import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Report from './Report';
import Risks from './Risks';
import Profil from './Profil';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

function EmpTabs() {
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
          height: 75,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Risks"
        component={Risks}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2 , marginBottom: 10}}>
              <Image
                source={require('../../src/images/risks.png')}
                resizeMode="contain"
                style={{
                  width: focused ? 36 : 30,
                  height: focused ? 36 : 30,
                  tintColor: focused ? '#2b72ff' : '#78778e',
                }}
              />
              {focused && <Text style={{ color: '#2b72ff', fontSize: 12 }}>Risks</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2, marginBottom: 10 }}>
              <Image
                source={require('../../src/images/report.png')}
                resizeMode="contain"
                style={{
                  width: focused ? 36 : 30,
                  height: focused ? 36 : 30,
                  tintColor: focused ? '#2b72ff' : '#78778e',
                  
                }}
              />
              {focused && <Text style={{ color: '#2b72ff', fontSize: 12 }}>Report</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2, marginBottom: 10 }}>
              <Image
                source={require('../../src/images/profil.png')}
                resizeMode="contain"
                style={{
                  width: focused ? 36 : 30,
                  height: focused ? 36 : 30,
                  tintColor: focused ? '#2b72ff' : '#78778e',
                }}
              />
              {focused && <Text style={{ color: '#2b72ff', fontSize: 12 }}>Profil</Text>}
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

    export {EmpTabs};
