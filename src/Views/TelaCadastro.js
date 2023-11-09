import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import Logo from '../Componentes/estiloLogo';

const TelaCadastro = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});

  const changeDate = (evento) => {
    setData(evento.nativeEvent.text);
  }

  return (
    <>
    <View>
      <ScrollView>
        <View style={styles.cabecalho}>
          <Logo />
          <Text style={styles.titulo}>Faça seu cadastro</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>CPF/RG/CRM</Text>
          <TextInput
            style={styles.input}
            placeholder='Selecione o documento CPF/RG/CRM'
            placeholderTextColor='#CCC6C6'
          />

          <View style={styles.divider}></View>

          <Text style={styles.text}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome completo'
            placeholderTextColor='#CCC6C6'
          />

          <View style={styles.divider}></View>

          <Text style={styles.text}>Nome Social</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome social'
            placeholderTextColor='#CCC6C6'
          />
          <View style={styles.divider}></View>
          <Text style={styles.textOp}>Campo opcional</Text>

          <Text style={styles.text}>Nome da mãe</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o nome da sua mãe'
            placeholderTextColor='#CCC6C6'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder='DD/MM/AAAA'
            placeholderTextColor='#CCC6C6'
            value={data}
            onChangeText={changeDate}
            keyboardType={'numeric'}
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o seu email'
            placeholderTextColor='#CCC6C6'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua senha'
            secureTextEntry={true}
            placeholderTextColor='#CCC6C6'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder='Confirme sua senha'
            secureTextEntry={true}
            placeholderTextColor='#CCC6C6'
          />
          <View style={styles.divider}></View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Inicio');
            }}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabecalho:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  titulo: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginVertical: 15,
    paddingHorizontal: 40,
  },
  text: {
    color: '#4759FA',
    marginRight: 100,
    marginTop: 20,
    marginVertical: -9,
  },
  textOp: {
    color: '#8A00E0',
    marginRight: 100,
    marginTop: -4,
    marginVertical: -9,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: "black",
    marginVertical: 10, // Adicionei margem vertical entre os inputs
    paddingHorizontal: 10, // Adicionei preenchimento lateral aos inputs
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
  textButton:{
    fontSize: 17,
    color: 'white',
  },
});


export default TelaCadastro;
