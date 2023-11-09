import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import dataDelegacias from '../data/Delegacias';
import Logo from '../Componentes/estiloLogo';

const TelaDelegacias = () => {
  const navigation = useNavigation();
  const [delegacias, setDelegacias] = useState(dataDelegacias);

  return (
    <ScrollView>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Delegacias da Mulher</Text>
      </View>

      <View style={styles.container}>
        {delegacias.map(delegacia => (
          <View key={delegacia.id_delegacias}>
            <Text style={styles.texto}>{delegacia.title}</Text>
            <Text style={styles.texto}>{delegacia.desc}</Text>
            <Text style={styles.texto}>{delegacia.ende}</Text>
            <Text style={styles.texto}>{delegacia.tel}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    paddingHorizontal: 35,
  },
  texto: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TelaDelegacias;
