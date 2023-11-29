import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import { Feather } from "@expo/vector-icons";
import Logo from '../Componentes/estiloLogo';
import axios from 'axios';

const TelaCadastro = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  const [tipoDocumento, setTipoDocumento] = useState("Selecione o documento");
  const [documento, setDocumento] = useState('')
  const [nomeCompleto, setNome] = useState('')
  const [nomeSocial, setNomeSocial] = useState('')
  const [nomeMae, setNomeMae] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmsenha] = useState('')
  const [camposCertos, setCamposCertos] = useState(false);
  const [senhaCerta, setSenhaCerta] = useState(false);

  const esconderSenha = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const esconderConfirmSenha = () => {
    setSecureTextEntryConfirm(!secureTextEntryConfirm);
  };

  const ConfirmandoSenha = () => {
    if (confirmSenha === senha) {
      setSenhaCerta(true);
      return true;
    } else {
      alert('As senhas não coincidem');
      setSenhaCerta(false);
      return false;
    }  
  }

  const Campos = () => {
    if (!nomeCompleto || !nomeMae || !dataNasc || !email || !senha || !confirmSenha) {
      alert('Preencha os campos corretamente');
      setCamposCertos(false);
      return false;
    } else {
      setCamposCertos(true);
      return true;
    }
  };
  
  const CadastrarUsuaria = async () => {
    try {
      // Verifica se já existe um usuário com o mesmo CPF no banco de dados
      const verificaUsuarioExistente = await axios.post('http://192.168.1.105:3000/verificarUsuario', {
        cpf: tipoDocumento === 'CPF' ? documento : null,
        rg: tipoDocumento === 'RG' ? documento : null,
        email,
      });
  
      if (verificaUsuarioExistente.data.existeUsuario) {
        alert('Já existe um usuário cadastrado com estes dados.');
        return;
      }
  
      const [dia, mes, ano] = dataNasc.split('/');
      const dataNascFormatada = `${ano}/${mes}/${dia}`;
  
      const response = await axios.post('http://192.168.1.105:3000/cadastrar', {
        tipoDocumento,
        documento,
        nomeCompleto,
        nomeSocial,
        nomeMae,
        dataNasc: dataNascFormatada,
        email,
        senha,
      });
    
      console.log('Resposta do servidor:', response.data);
    
      if (response.data.success) {
        alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Inicio');
      } else {
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição Axios:', error.message);
      alert('Erro interno do servidor');
    }
  };  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cabecalho}>
          <Logo />
          <Text style={styles.titulo}>Faça seu cadastro</Text>
        </View>

          
            <Text style={styles.label}>Escolha um documento</Text>
            <Picker
              style={styles.input}
              selectedValue={tipoDocumento}
              onValueChange={(valor) => setTipoDocumento(valor)}
            >
              <Picker.Item label='Selecione o documento' value='Selecione o documento' />
              <Picker.Item label='CPF' value='CPF' />
              <Picker.Item label='RG' value='RG' />
            </Picker>

        {tipoDocumento !== 'Selecione o documento' && (
          <>
            <Text style={styles.label}>{tipoDocumento}</Text>
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

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu nome completo'
          value={nomeCompleto}
          onChangeText={setNome}
          placeholderTextColor='gray'
        />
        <View style={styles.divider}></View>

        <Text style={styles.label}>Nome Social</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite seu nome social'
          value={nomeSocial}
          onChangeText={setNomeSocial}
          placeholderTextColor='gray'
        />
        <View style={styles.divider}></View>
        <Text style={styles.textOp}>Campo opcional</Text>

        <Text style={styles.label}>Nome da mãe</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o nome da sua mãe'
          value={nomeMae}
          onChangeText={setNomeMae}
          placeholderTextColor='gray'
        />
        <View style={styles.divider}></View>

        <Text style={styles.label}>Data de nascimento</Text>
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

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o seu email'
          value={email}
          onChangeText={setEmail}
          placeholderTextColor='gray'
        />
        <View style={styles.divider}></View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Digite sua senha'
            value={senha}
            secureTextEntry={secureTextEntry}
            onChangeText={setSenha}
            placeholderTextColor='gray'
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

        <Text style={styles.label}>Confirmar senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Confirme sua senha'
            value={confirmSenha}
            onChangeText={setConfirmsenha}
            secureTextEntry={secureTextEntryConfirm}
            placeholderTextColor='gray'
          />
          <TouchableOpacity onPress={esconderConfirmSenha}>
            <Feather
              name={secureTextEntryConfirm ? 'eye-off' : 'eye'}
              color={'white'}
              size={15}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={CadastrarUsuaria}
        >
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  label: {
    color: '#4759FA',
    marginTop: 10,
    fontWeight: 'bold',
  },
  textOp: {
    color: '#8A00E0',
    marginTop: -4,
    marginVertical: -9,
  },
  input: {
    height: 40,
    backgroundColor: "black",
    marginVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    /* borderWidth: 1,
    borderColor: '#4759FA',
    borderRadius: 5, */
  },
  divider: {
    height: 1, 
    width: '100%', 
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#4759FA', 
  },
  button: {
    height: 35,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    color: 'white',
    /* borderWidth: 1,
    borderColor: '#4759FA',
    borderRadius: 5, */
    marginRight: 5,
  },
});

export default TelaCadastro;
