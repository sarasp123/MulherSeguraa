import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import TelaEspera from "../Views/TelaEspera";
import TelaLogin from "../Views/TelaLogin";
import TelaCadastro from "../Views/TelaCadastro";
import TelaDelegacias from "../Views/TelaDelegacias";
import TelaPerfil from "../Views/TelaPerfil";
import TelaTutorial from "../Views/TelaTutorial";
import TelaRedeApoio from "../Views/RedeApoio";
import TelaViolencia from "../Views/TelaViolencia";
import Tabs from "../Views/telaComTabs";
import TelaAssistencia from "../Views/TelaAssistencia";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Drawers() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: ' ',
        drawerStyle: { backgroundColor: 'black' },
        headerShown: false,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen name="Inicial" component={Tabs} options={{
        drawerLabel: 'Início',
        drawerIcon: ({ focused, size }) => (
          <Feather
            name={focused ? 'home' : 'home'}
            size={size}
            color={focused ? 'white' : 'gray'}
          />
        ),
      }}/>
      
      <Drawer.Screen name="Perfil" component={TelaPerfil} options={{
        drawerIcon: ({ focused, size }) => (
          <Feather
            name={focused ? 'user' : 'user'}
            size={size}
            color={focused ? 'white' : 'gray'}
          />
        ),
        drawerLabel: 'Perfil',
      }} />
      <Drawer.Screen name="Tutorial" component={TelaTutorial} options={{
        drawerIcon: ({ focused, size }) => (
          <Feather
            name={focused ? 'help-circle' : 'help-circle'}
            size={size}
            color={focused ? 'white' : 'gray'}
          />
        ),
        drawerLabel: 'Tutorial',
      }}/>


    </Drawer.Navigator>
  );
}




export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaEspera"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TelaEspera" component={TelaEspera} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="Inicio" component={Drawers}/>
        <Stack.Screen name="TelaDelegacias"  component={TelaDelegacias} />
        <Stack.Screen name="TelaAssistencia"  component={TelaAssistencia} />
        <Stack.Screen name="TelaRedeApoio"  component={TelaRedeApoio} />
        <Stack.Screen name="TelaViolencia"  component={TelaViolencia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
