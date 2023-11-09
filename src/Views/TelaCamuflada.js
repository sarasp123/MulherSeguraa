import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'; // Importe Text para um botão personalizado
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const TelaCamuflada = () => {
  const navigation = useNavigation();

  return (
    <>
    
        <View style={styles.cabecalho}>
            <View style={styles.AAA}>
                <View style={styles.logo}></View>
                <Text style={styles.ola}>FOI? AAA</Text>
            </View>
        </View>

        
        
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cabecalho:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'black',
    height: 150,
  },
  AAA:{
    height: 140,
    backgroundColor: '#D9D9D9',
    width: 360,
    borderRadius: 100,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#CB3EF5",
    borderRadius: 75, // Reduzi o raio pela metade para torná-lo um círculo
    marginLeft: 10,
    marginVertical: 10,
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
});

export default TelaCamuflada;
