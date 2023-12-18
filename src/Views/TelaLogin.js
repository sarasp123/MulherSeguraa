import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import Logo from '../Componentes/estiloLogo';

const TelaLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const esconderSenha = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image source={require('../../img/logo.png')}
        style={{
          width: 185,
          height: 150,
        }}/>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='gray'
        color= 'white'
        value={email}
        onChangeText={(text) => setEmail(text)} 
      />

      <View style={styles.divider}></View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          placeholderTextColor='gray'
          color='white'
          value={senha}
          onChangeText={(text) => setSenha(text)} 
        />
        <TouchableOpacity onPress={esconderSenha}>
          <Feather
            name={secureTextEntry ? 'eye-off' : 'eye'}
            color={'white'}
            size={15}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.divider}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            const response = await axios.post('http://10.11.34.95:3000/login', {
              email,
              senha,
            });
      
            if (response.data.success) {
              navigation.navigate('Inicio');
            } else {
              alert('Login falhou. Credenciais inválidas.');
            }
          } catch (error) {
            console.error('Erro na requisição Axios:', error);
            alert('Erro interno do servidor');
          }
        }}
      >
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cadastre}
        onPress={() => {
          navigation.navigate('TelaCadastro')
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
    width: 50,
    height: 50,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    height: 54,
    width: 200,
    backgroundColor: 'black',
    paddingHorizontal: 10,
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
