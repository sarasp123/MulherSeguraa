import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaInicial from './TelaInicial';
import TelaAudio from './TelaAudio';
import TelaNotificacao from './TelaNotificacao';
import { Feather } from '@expo/vector-icons';

const Tab= createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    initialRouteName="TelaInicial"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="TelaNotificacao"
        component={TelaNotificacao}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" color={color} size={size} />
          ),
          tabBarLabel: 'Notificação',
        }}
       
      />

      <Tab.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Início',
        }}
      />

      <Tab.Screen
        name="TelaAudio"
        component={TelaAudio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="mic" color={color} size={size} />
          ),
          tabBarLabel: 'Áudios Gravados',
        }}
      />
     </Tab.Navigator>
  );
}
export default Tabs;

// const Tab = createBottomTabNavigator();

// function TelaDelegaciasComTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="TelaNotificacao"
//         component={TelaNotificacao}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="bell" color={color} size={size} />
//           ),
//           tabBarLabel: 'Notificação',
//         }}
//       />

//       <Tab.Screen
//         name="TelaInicial"
//         component={TelaInicial}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="home" color={color} size={size} />
//           ),
//           tabBarLabel: 'Início',
//         }}
//       />

//       <Tab.Screen
//         name="TelaAudio"
//         component={TelaAudio}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="mic" color={color} size={size} />
//           ),
//           tabBarLabel: 'Áudios Gravados',
//         }}
//       />

//     </Tab.Navigator>
//   );
// }

// export default TelaDelegaciasComTabs;