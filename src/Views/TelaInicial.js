import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import * as Location from 'expo-location';

const TelaInicial = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (countdown > 0 && showModal) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Abre o WhatsApp com uma mensagem pré-preenchida
      sendPanicMessage();
      setShowModal(false);
    }

    return () => clearInterval(timer);
  }, [countdown, showModal]);

  const sendPanicMessage = async () => {
    try {
      // Obter a permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      // Obter a localização do dispositivo
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      // Construir a mensagem
      for(i=0;i<SQLError.length;i++)
      {
        const message = `Pânico! Preciso de ajuda!\nLocalização: https://maps.google.com/?q=${latitude},${longitude}`;
        const phoneNumber = sql[i].telefone; '67996514882'; // Substitua pelo número de telefone real

      // Abre o WhatsApp com a mensagem pré-preenchida
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      Linking.openURL(url);

      }
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
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
  };

  const handleCancelPress = () => {
    setShowModal(false);
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
              source={require('../../img/logo.png')}
              style={styles.logo}
              
            />
                <Text style={styles.ola}>Olá, NOME</Text>
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
    width: 60,
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
