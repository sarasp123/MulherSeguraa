import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import axios from 'axios';
import * as Location from 'expo-location';
import AudioRecorder from './Audio';

const TelaInicial = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState('denied');
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [userData, setUserData] = useState({});
  const [isRecording, setIsRecording] = useState(false);


 /*  useEffect(() => {
    checkPermission();
    buscandoUser(); 
  }, []); */

 
  const buscandoUser = async () => {
    try {
      const response = await axios.get('http://10.11.34.130:3000/perfil');
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
    }
  };

  useEffect(() => {
    checkPermission();
    buscandoUser(); 
    let timer;
    if (countdown > 0 && showModal) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      sendPanicMessage();
      setShowModal(false);
      if (status === 'granted' && !recordingStarted) {
        setRecordingStarted(true);
        AudioRecorder(); // Inicia a gravação após o countdown
      } else {
        console.log('Permissão de gravação não concedida ou gravação já iniciada.');
      }
    }
    if (countdown === 0 && showModal) {
      // Send panic message
      sendPanicMessage();
      setShowModal(false);
    
      // Start recording
      const audioRecorder = new AudioRecorder(
        AudioContext.createMediaStreamSource(),
        16000,
        2
      );
      audioRecorder.record();
    }

    return () => {
      clearInterval(timer);
      setIsRecording(false)
    };
  }, [countdown, showModal, status, recordingStarted]);

  const checkPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
    }
  };

  const sendPanicMessage = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const message = `Pânico! Preciso de ajuda!\nLocalização: https://maps.google.com/?q=${latitude},${longitude}`;
      const phoneNumber = '67996514882'; // Substitua pelo número de telefone real

      /* const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`; */
      Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handlePanicButtonPress = () => {
    setShowModal(true);
    setCountdown(5);
    setRecordingStarted(false); // Reinicia a flag quando o botão é pressionado novamente

    if(!isRecording){
      setIsRecording(true);
    }
  };

  const handleConfirmPress = () => {
    // Enviar mensagem quando o usuário confirma
    sendPanicMessage();
    setShowModal(false);
  };

  const handleCancelPress = () => {
    setShowModal(false);
  };

  const handleRecordingStart = () => {
    // Callback chamado quando a gravação é iniciada
    console.log('Gravação de áudio iniciada!');
  };

  const extrairPrimeiraPalavra = () => {
    if (!userData.nomeCompleto) return '';
    // Divida o nome completo em palavras usando o espaço como separador
    const palavras = userData.nomeCompleto.split(' ');
    // Retorne a primeira palavra
    return palavras[0];
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
        </View>
      </View>

      {/* Modal */}
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
      {isRecording && <AudioRecorder onRecordingStart={handleRecordingStart} />}
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
