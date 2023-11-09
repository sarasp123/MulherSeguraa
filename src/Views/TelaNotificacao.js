import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Logo from '../Componentes/estiloLogo'

const TelaNotificacao = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.cabecalho}>
        <Logo />
        <Text style={styles.titulo}>Notificações</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.conjunto}>
          <Feather name="message-circle" color={'white'} size={30} style={styles.icon} />
          <View style={styles.notificacaoContainer}>
            <Text style={styles.notificacao}>XXXXXXXXXXXXXXXXXXXXXX</Text>
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
  notificacaoContainer: {
    flex: 1,
  },
  notificacao: {
    color: 'white',
  },
});

export default TelaNotificacao;
