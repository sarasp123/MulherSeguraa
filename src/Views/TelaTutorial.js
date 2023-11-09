import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'; // Importe Text para um botão personalizado
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const TelaTutorial = () => {
  const navigation = useNavigation();

  return (
    <>
    
        <View style={styles.cabecalho}>
            <View style={styles.AAA}>
                <View style={styles.logo}></View>
                <Text style={styles.ola}>ALGUMA COISA</Text>
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
})

export default TelaTutorial;
