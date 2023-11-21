import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../Componentes/estiloLogo';
import { TextInputMask } from "react-native-masked-text";

const TelaCadastrar = () => {
  const navigation = useNavigation();

  const [nomeCompleto, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [camposCertos, setCamposCertos] = useState(false);

  const Campos = () => {
    if (!nomeCompleto || !tel) {
      alert('Preencha os campos corretamente');
      setCamposCertos(false);
      return;
    } else {
      setCamposCertos(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite o nome completo'
        value={nomeCompleto}
        onChangeText={setNome}
        placeholderTextColor='gray'
      />
      <View style={styles.divider}></View>

      <Text style={styles.text}>Telefone</Text>
      <TextInputMask
        style={styles.input}
        placeholder='Digite o telefone'
        value={tel}
        keyboardType={'numeric'}
        type={'custom'}
        options={{ mask: '99 9999-99999' }}
        onChangeText={setTel}
        placeholderTextColor='gray'
      />
      <View style={styles.divider}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Campos();
          if (camposCertos === true) {
            navigation.navigate('Inicio');
          }
        }}
      >
        <Text style={styles.textButton}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#4759FA',
    marginRight: 100,
    marginTop: 20,
    marginVertical: -9,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: "black",
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  divider: {
    height: 1,
    width: 200,
    marginTop: -15,
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
});

export default TelaCadastrar;