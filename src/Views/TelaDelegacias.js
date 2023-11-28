import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
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

  const linkMapa = (address) => {
    const formattedAddress = address.replace(/\s+/g, '+');
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    Linking.openURL(mapLink);
  };

  const linkTel = (telefones) => {
    if (telefones.some(num => num.toLowerCase().includes('whats'))) {
      // Se algum número tiver a indicação de "whats", abrir no WhatsApp
      const cleanedNumbers = telefones.map(num => num.replace(/[^0-9]/g, ''));
      const whatsappLink = `https://wa.me/${cleanedNumbers[0]}`;
      Linking.openURL(whatsappLink);
    } else {
      // Caso contrário, abrir no aplicativo de telefone padrão
      const cleanedNumbers = telefones.map(num => num.replace(/[^0-9]/g, ''));
      const telefoneLink = `tel:${cleanedNumbers.join(',')}`;
      Linking.openURL(telefoneLink);
    }
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
                <Text style={styles.texto}><Feather name='clock' color={'#CB3EF5'} size={14}/> {delegacia.plantao}</Text>
                
                <Text style={styles.texto}>
                  <Feather name="map-pin" color={'#CB3EF5'} size={14} />
                  <Text
                    style={{ textDecorationLine: 'underline', color: 'white' }}
                    onPress={() => linkMapa(delegacia.ende)}
                  >
                    {' '}
                    {delegacia.ende}
                  </Text>
                </Text>

                {Array.isArray(delegacia.tel) ? (
                  delegacia.tel.map((telefone, index) => (
                    <Text key={index} style={styles.texto}>
                      <Feather name="phone" color={'#CB3EF5'} size={14} />
                      <Text
                        style={{ textDecorationLine: 'underline', color: 'white' }}
                        onPress={() => linkTel([telefone])}
                      >
                        {' '}
                        {telefone}
                      </Text>
                    </Text>
                  ))
                ) : (
                  <Text style={styles.texto}>
                    <Feather name="phone" color={'#CB3EF5'} size={14} />
                    <Text
                      style={{ textDecorationLine: 'underline', color: 'white' }}
                      onPress={() => linkTel([delegacias.tel])}
                    >
                      {' '}
                      {delegacia.tel}
                    </Text>
                  </Text>
                )}
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

export default TelaDelegacias;
