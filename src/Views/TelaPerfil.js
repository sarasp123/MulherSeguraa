import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Logo from '../Componentes/estiloLogo';

const TelaPerfil = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.cabecalho}>
            
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{
          top: 5,
          left: 15,
        }}
      >
        <Feather name="menu" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
          <Logo
            style={{
              padding: 10,
            }}
          />
        </View>
        <Text style={styles.titulo}>Informações pessoais</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Nome:</Text>
            <Text style={styles.nome}> nome completo </Text>
          </View>
          <Feather name="edit-2" color={'white'} size={25} marginRight={15} />
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Nome Social:</Text>
            <Text style={styles.nome}> nome social </Text>
          </View>
          <Feather name="edit-2" color={'white'} size={25} marginRight={15} />
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Data de Nascimento:</Text>
            <Text style={styles.nome}> xx/xx/xxxx </Text>
          </View>
          <Feather name="edit-2" color={'white'} size={25} marginRight={15} />
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Email:</Text>
            <Text style={styles.nome}> email completo </Text>
          </View>
          <Feather name="edit-2" color={'white'} size={25} marginRight={15} />
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Senha:</Text>
            <Text style={styles.nome}> senha escondida </Text>
          </View>
          <Feather name="edit-2" color={'white'} size={25} marginRight={15} />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#CB3EF5",
    borderRadius: 75,
    marginLeft: 10,
    marginVertical: 10,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  conjunto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 25,
  },
  icon: {
    marginRight: 10,
  },
  tituloNome: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  nome: {
    color: 'white',
    fontSize: 15,
  },
});

export default TelaPerfil;
