import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import dataAssistencias from '../data/Assistencias';
import Logo from '../Componentes/estiloLogo';


const TelaAssistencia = () => {
  const navigation = useNavigation();
  const assistencias = dataAssistencias;

  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Órgãos de assistência à mulher</Text>
      </View>

      <View style={styles.container}>
        {assistencias.map(assistencia => (
          <TouchableOpacity
            key={assistencia.id}
            style={styles.item}
            onPress={() => toggleExpanded(assistencia.title)}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.titleDel}>{assistencia.title}</Text>
              <Feather
                name={expanded === assistencia.title ? 'chevron-up' : 'chevron-down'}
                color={'white'}
                size={30}
              />
            </View>
            <View style={styles.divider}></View>

            {expanded === assistencia.title && (
              <View>
                <Text style={styles.texto}>{assistencia.desc}</Text>
                <Text style={styles.texto}>{assistencia.ende}</Text>
                <Text style={styles.texto}>{assistencia.tel}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
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
    paddingHorizontal: 5,
  },
  texto: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    marginBottom: 30,
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

export default TelaAssistencia;
