import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import Logo from '../Componentes/estiloLogo';
import db from '../Config/dbConnection';

const TelaCadastro = () => {
  const navigation = useNavigation();

  const [tipoDocumento, setTipoDocumento] = useState("Selecione o documento");
  const [documento, setDocumento] = useState('')
  const [nomeCompleto, setNome] = useState('')
  const [nomeSocial, setNomeSocial] = useState('')
  const [nomeMae, setNomeMae] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmsenha] = useState('')
  const [camposCertos, setcamposCertos] = useState(false);
  const [senhaCerta, setsenhaCerta] = useState(false);

  const ConfirmandoSenha = () => {
    if (confirmSenha === senha) {
      setsenhaCerta(true);
      return ;
    } else {
      alert('As senhas não coincidem');
      setsenhaCerta(false);
    }  
  }

  const Campos = () => {
    if (!nomeCompleto || !nomeMae || !dataNasc || !email || !senha || !confirmSenha) {
      alert('Preencha os campos corretamente');
      setcamposCertos(false);
      return;
    } else {
      setcamposCertos(true);
    }
  };
  
  const CadastrarUsuaria = async () => {
    try {
      if (!camposCertos || !senhaCerta) {
        alert('Preencha os campos corretamente');
        return;
      }
  
      db.transaction((transaction) => {
        transaction.executeSql(
          'INSERT INTO usuaria (tipoDocumento, documentoNumero, nomeCompleto, nomeSocial, nomeMae, dataNasc, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            tipoDocumento,
            documento,
            nomeCompleto,
            nomeSocial,
            nomeMae,
            dataNasc,
            email,
            senha,
          ],
          (_, results) => {
            console.log('Usuário cadastrado com sucesso:', results);
            navigation.navigate('Inicio');
          },
          (_, error) => {
            console.error('Erro ao cadastrar usuário no banco de dados:', error);
          }
        );
      });
  
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.cabecalho}>
          <Logo />
          <Text style={styles.titulo}>Faça seu cadastro</Text>
        </View>

        <View style={styles.container}>
          {tipoDocumento === 'Selecione o documento' && (
            <>
              <Text style={styles.text}>Escolha um documento</Text>
              <Picker
                style={styles.input}
                selectedValue={tipoDocumento}
                onValueChange={(valor) => setTipoDocumento(valor)}
              >
                <Picker.Item label='Selecione o documento' value='Selecione o documento' />
                <Picker.Item label='CPF' value='CPF' />
                <Picker.Item label='RG' value='RG' />
              </Picker>
            </>
          )}

          {tipoDocumento !== 'Selecione o documento' && (
            <>
              <Text style={styles.text}>{tipoDocumento}</Text>
              <TextInputMask
                style={styles.input}
                placeholder={`Digite o número do ${tipoDocumento}`}
                placeholderTextColor='#CCC6C6'
                value={documento}
                keyboardType={'numeric'}
                type={tipoDocumento === 'CPF' ? 'cpf' : 'custom'}
                options={{ mask: '9.999.999' }}
                /* maxLength={tipoDocumento === 'CPF' ? 11 : 11} */
                onChangeText={setDocumento}
              />
            </>
          )}

          <View style={styles.divider}></View>

          <Text style={styles.text}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome completo'
            value={nomeCompleto}
            onChangeText={setNome}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Nome Social</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome social'
            value={nomeSocial}
            onChangeText={setNomeSocial}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>
          <Text style={styles.textOp}>Campo opcional</Text>

          <Text style={styles.text}>Nome da mãe</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o nome da sua mãe'
            value={nomeMae}
            onChangeText={setNomeMae}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Data de nascimento</Text>
          <TextInputMask
            style={styles.input}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            placeholder='DD/MM/AAAA'
            placeholderTextColor='gray'
            value={dataNasc}
            onChangeText={setDataNasc}
            keyboardType={'numeric'}
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o seu email'
            value={email}
            onChangeText={setEmail}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua senha'
            value={senha}
            secureTextEntry={true}
            onChangeText={setSenha}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>

          <Text style={styles.text}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder='Confirme sua senha'
            value={confirmSenha}
            onChangeText={setConfirmsenha}
            secureTextEntry={true}
            placeholderTextColor='gray'
          />
          <View style={styles.divider}></View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Campos();
              CadastrarUsuaria();
              ConfirmandoSenha();
              /* if(camposCertos === true && senhaCerta === true){
              navigation.navigate('Inicio');
              } */
            }}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      
    
  );
}

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
    fontWeight: 'bold',
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
  textButton:{
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TelaCadastro;
