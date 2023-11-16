import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import dataDelegacias from '../data/Delegacias';
import Logo from '../Componentes/estiloLogo';

const TelaDelegacias = () => {
  const navigation = useNavigation();
  const delegacias = dataDelegacias;

  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <ScrollView>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Delegacias da Mulher</Text>
      </View>

      <View style={styles.container}>
      {delegacias.map(delegacia => (
        <TouchableOpacity
          key={delegacia.id}
          style={styles.item}
          onPress={() => toggleExpanded(delegacia.title)}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.titleDel}>{delegacia.title}</Text>
            <Feather
              name={expanded === delegacia.title ? 'chevron-up' : 'chevron-down'}
              color={'white'}
              size={30}
            />
          </View>
          <View style={styles.divider}></View>

          {expanded === delegacia.title && (
            <View>
              <Text style={styles.texto}>{delegacia.desc}</Text>
              <Text style={styles.texto}>{delegacia.ende}</Text>
              <Text style={styles.texto}>{delegacia.tel}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
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
  item: {
    marginBottom: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: 290,
    marginTop: 4,
    backgroundColor: '#4759FA',
    marginLeft: 40,
  },
  titleDel: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});

export default TelaDelegacias;