import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Logo from '../Componentes/estiloLogo';

const TelaAudio = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Áudios Gravados</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.conjunto}>
          <Feather name="play-circle" color={'white'} size={30} style={styles.icon} />
          <View style={styles.audioContainer}>
            <Text style={styles.audio}>XX/XX/XXXX</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cabecalho: {
    backgroundColor: 'black',
    height: 100,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  divider: {
    height: 1,
    width: '92%',
    backgroundColor: 'white',
    marginLeft: '4%'
  },
  conjunto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  audioContainer: {
    flex: 1,
  },
  audio: {
    color: 'white',
  },
});

export default TelaAudio;
