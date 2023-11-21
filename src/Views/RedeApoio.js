import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import TelaCadastrados from './TelaCadastrados';
import TelaCadastrar from './TelaCadastrar';
import Logo from '../Componentes/estiloLogo';

const TelaRedeApoio = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Rede de apoio</Text>
      </View>

      <Tab.Navigator
        initialRouteName="TelaCadastrados"
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          tabBarActiveTintColor: 'white',
          tabBarIndicatorStyle: { backgroundColor: '#4759FA' },
        }}
      >
        <Tab.Screen
          name="TelaCadastrados"
          component={TelaCadastrados}
          options={{
            tabBarLabel: 'Números Cadastrados',
          }}
        />

        <Tab.Screen
          name="TelaCadastrar"
          component={TelaCadastrar}
          options={{
            tabBarLabel: 'Cadastrar Números',
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  titulo: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 15,
    paddingHorizontal: 5,
  },
});

export default TelaRedeApoio;
