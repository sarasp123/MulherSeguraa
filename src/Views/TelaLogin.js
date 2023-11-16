import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../Componentes/estiloLogo';

const TelaLogin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Logo />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='gray'
      />

      <View style={styles.divider}></View>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        placeholderTextColor='gray'
      />

      <View style={styles.divider}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Inicio');
        }}
      >
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.esqueciSenha}
        onPress={() => {
          // Adicione a lógica de navegação aqui
          // Por exemplo: navigation.navigate('TelaPrincipal');
        }}
      >
        <Text style={styles.textButton2}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cadastre}
        onPress={() => {
          navigation.navigate('TelaCadastro');
        }}
      >
        <Text style={styles.textButton2}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#CB3EF5',
    borderRadius: 20,
    marginLeft: 10,
    marginVertical: 10,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: 'black',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    width: 200,
    marginTop: -9,
    backgroundColor: '#4759FA',
  },
  button: {
    height: 35,
    width: 100,
    backgroundColor: '#CB3EF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 15,
  },
  textButton: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  esqueciSenha: {
    marginVertical: 20,
  },
  cadastre: {
    width: 200,
    height: 40,
    backgroundColor: '#4759FA',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton2: {
    fontSize: 14,
    color: 'white',
  },
});

export default TelaLogin;
