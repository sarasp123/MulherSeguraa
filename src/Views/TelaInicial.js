import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import * as Location from 'expo-location';
import {Audio} from 'expo-av';


const TelaInicial = () => {

  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState('denied');
  const [userData, setUserData] = useState({});
  const [redeData, setRedeData] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState('');


 /*  useEffect(() => {
    checkPermission();
    buscandoUser(); 
  }, []); */

 
  const buscandoUser = async () => {
    try {
      const response = await axios.get('http://10.11.34.95:3000/perfil');
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
    }
  };

  useEffect(() => {
    checkPermission();
    let timer;
    if (countdown > 0 && showModal) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      sendPanicMessage();
      setShowModal(false);
      /* startRecording();  */    
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, showModal, status]);

  const checkPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
    }
  };

  const sendPanicMessage = () => {
    checkLocationPermission()
      .then(() => axios.post('http://10.11.34.95:3000/verificarRede'))
      .then(response => {
        const phoneNumber = response.data.tel;
        return Location.getCurrentPositionAsync()
          .then(location => ({ phoneNumber, location }));
      })
      .then(({ phoneNumber, location }) => {
        const { latitude, longitude } = location.coords;
        const message = `Pânico! Preciso de ajuda!\nLocalização: https://maps.google.com/?q=${latitude},${longitude}`;
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        Linking.openURL(url);
      })
      .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
      });
  };
  
  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      throw new Error('Permissão de localização negada');
    }
  };
  

  const handlePanicButtonPress = () => {
    setShowModal(true);
    setCountdown(5);
  };

  const handleConfirmPress = () => {
    // Enviar mensagem quando o usuário confirma
    sendPanicMessage();
    setShowModal(false);
    /* startRecording(); */
    
  
    // Verifique se audioUri está definido antes de navegar
    /* if (audioUri) {
      navigation.navigate('TelaAudio', { audioUri: audioUri });
    } else {
      console.error('audioUri não está definido');
    } */
  };
  

    const handleCancelPress = () => {
      // Parar a gravação de áudio ao cancelar
      /* stopRecording(); */
      setShowModal(false);
    };


  const extrairPrimeiraPalavra = () => {
    buscandoUser();
    if (!userData.nomeCompleto) return '';
    // Divida o nome completo em palavras usando o espaço como separador
    const palavras = userData.nomeCompleto.split(' ');
    // Retorne a primeira palavra
    return palavras[0];
  };


  // Adicione o seguinte código para lidar com a gravação de áudio
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setIsRecording(true);

      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
  
        // Salve o áudio gravado em um arquivo
        const uri = recording.getURI();
        console.log('Áudio gravado em:', uri);
  
        // Atualize o estado com o URI do áudio gravado
        setAudioUri(uri);
        
      }, 3000); // 3 segundos
      
    } catch (error) {
      console.error('Erro ao iniciar a gravação de áudio:', error);
    }
    
  };

  const stopRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setIsRecording(false);
    } catch (error) {
      console.error('Erro ao parar a gravação de áudio:', error);
    }
  };


  const handlePlayButtonPress = async () => {
    if (audioUri) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );      
    }  
  };
  


  return (
    <>
    
        <View style={styles.cabecalho}>
        <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: 10,
          zIndex: 1,
        }}
      >
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
            <View style={styles.AAA}>
            <Image
              source={require('../../img/logo-mono.png')}
              style={styles.logo}
              
            />
                <Text style={styles.ola}>Olá, {extrairPrimeiraPalavra()}</Text>
            </View>
        </View>

        <View style={styles.container}>
        <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.delegacias}
          onPress={() => {
            navigation.navigate('TelaDelegacias');
          }}
          >
        <Image
            source={require('../../img/Sirene.png')}
            style={styles.imgs} 
        />
        <Text style={styles.textButtons}>Delegacias próximas</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.assistencia}
          onPress={() => {
              navigation.navigate('TelaAssistencia');
          }}
          >
        <Image
            source={require('../../img/admin.png')} 
            style={styles.imgs}
        />
        {/* <Text style={styles.textButtons}>Órgãos de</Text>  */}
        <Text style={styles.textButtons}>Assistência à mulher</Text> 
        </TouchableOpacity>

        </View>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            style={styles.rede}
            onPress={() => {
              navigation.navigate('TelaRedeApoio');
            }}
          >
            <Image
              source={require('../../img/Mao.png')}
              style={styles.imgs}
            />
            <Text style={styles.textButtons}>Rede de apoio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tipos}
            onPress={() => {
              navigation.navigate('TelaViolencia');
            }}
          >
            <Image
              source={require('../../img/mulher.png')}
              style={styles.imgs}
            />
            <Text style={styles.textButtons}>Tipos de violência</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer3}>
          <TouchableOpacity
            style={styles.alerta}
            onPress={handlePanicButtonPress}
          >
            <Feather name="alert-triangle" size={50} color="red" />
            <Text style={styles.textButtons}>Botão do Pânico</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handlePlayButtonPress}>
  <Feather name="play" size={30} color="green" />
</TouchableOpacity> */}

        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{`Confirme o envio da mensagem em ${countdown} segundos ou cancele`}</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'green' }]}
                onPress={handleConfirmPress}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'red' }]}
                onPress={handleCancelPress}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cabecalho: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 150,
  },
  AAA: {
    flexDirection: 'column',
    height: 140,
    backgroundColor: '#D9D9D9',
    width: 350,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 74,
    height: 60,
  },
  ola: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delegacias: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    marginLeft: 28,
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtons: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  },
  assistencia: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  imgs: {
    width: 70,
    height: 70,
  },
  buttonContainer2: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10, 
  },
  rede: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    marginLeft: 28,
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipos: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  rodape: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'black'
  },
  imgsRodape: {
    width: 35,
    height: 35,
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  alerta: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    marginLeft: 100,
    borderWidth: 7,
    borderColor: '#ADD8E6', /* Qual cor eu coloco? */
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TelaInicial;
