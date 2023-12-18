import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
/* import { useNavigation } from '@react-navigation/native';*/
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Logo from '../Componentes/estiloLogo';

const TelaAudio = ({route}) => {
 /*  const navigation = useNavigation(); */
 /* const { audioUri } = route.params;
 const [sound, setSound] = useState();
  const [audioExist, setAudioExist] = useState(!!audioUri);

  const playSound = async () => {  
    try {
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        
      );
      setSound(sound);
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  /* if (!audioExist) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nenhum áudio gravado anteriormente</Text>
      </View>
    );
  }else{ 

  return (
    <>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Áudios Gravados</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          <Feather name="play-circle" color={'white'} size={60} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </>
  ); */
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
