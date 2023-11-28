import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import dataViolencias from '../data/TiposViolencia';
import Logo from '../Componentes/estiloLogo';


const TelaViolencia = () => {
  const navigation = useNavigation();
  const violencias = dataViolencias;

  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <>
      <View style={styles.cabecalho}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Inicio')}
          style={{
            top: 20,
            left: 2,
          }}
        >
          <Feather name="arrow-left" size={30} color="white" />
        </TouchableOpacity>

        <Logo 
          style={{
            top: 20,
            left: 50,
            padding: 10,
          }}
         />
        <Text style={styles.titulo}>Tipos de violência</Text>
      </View>

      <View style={styles.container}>
        {violencias.map(violencia => (
          <TouchableOpacity
            key={violencia.id}
            style={styles.item}
            onPress={() => toggleExpanded(violencia.title)}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.titleDel}>{violencia.title}</Text>
              <Feather
                name={expanded === violencia.title ? 'chevron-up' : 'chevron-down'}
                color={'white'}
                size={30}
              />
            </View>
            <View style={styles.divider}></View>

            {expanded === violencia.title && (
              <View style={styles.descContainer}>
                <View style={styles.column}>
                  {violencia.desc.slice(0, Math.ceil(violencia.desc.length / 2)).map((item, index) => (
                    <Text key={index} style={styles.texto}>
                      {`\u2022 ${item}`}
                    </Text>
                  ))}
                </View>
                <View style={styles.column}>
                  {violencia.desc.slice(Math.ceil(violencia.desc.length / 2)).map((item, index) => (
                    <Text key={index} style={styles.texto}>
                      {`\u2022 ${item}`}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
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
    fontSize: 18,
    marginVertical: 20,
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

export default TelaViolencia;
