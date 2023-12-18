import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Modal } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import Logo from '../Componentes/estiloLogo';
import { TextInput } from 'react-native-gesture-handler';

const TelaPerfil = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [secureTextEntryAntiga, setSecureTextEntryAntiga] = useState(true);
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmsenha] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [dataChanged, setDataChanged] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nomeCompleto: userData.nomeCompleto || '',
    nomeSocial: userData.nomeSocial || '',
    dataNasc: userData.dataNasc || '',
    email: userData.email || '',
    senha: userData.senha || '',
  });

  const handleEditToggle = () => {
    if (editing) {
      // Enviar dados editados para o backend
      sendEditedData();
    }
    setEditing(!editing);
  };

  const esconderSenhaAntiga = () => {
    setSecureTextEntryAntiga(!secureTextEntryAntiga);
  };

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

  const sendEditedData = async () => {
    try {
      await axios.post('http://10.11.34.95:3000/atualizarPerfil', {
        nomeCompleto: userData.nomeCompleto,
        nomeSocial: userData.nomeSocial,
        dataNasc: userData.dataNasc,
        email: userData.email,
        senha: userData.senha
      });

      // Define que os dados foram alterados
      setDataChanged(true);
    } catch (error) {
      console.error('Erro ao atualizar dados da rede:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.11.34.95:3000/perfil');
        setUserData(response.data);
        const newData = response.data;

        if(dataChanged){
          Alert.alert('Atualização', 'Os dados pessoais foram atualizados')
          setDataChanged(false)
        }

        setUserData(newData);
        setEditedData({
          nomeCompleto: userData.nomeCompleto || '',
          nomeSocial: userData.nomeSocial || '',
          dataNasc: userData.dataNasc || '',
          email: userData.email || '',
          senha: userData.senha || '',
        })
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      }
    };
  
    fetchData();
  }, [dataChanged]);




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
            {editing ?(
              <TextInput
                style={styles.nome}
                value={editedData.nomeCompleto}
                onChangeText={(text) => setEditedData({ ...editedData, nomeCompleto: text})}
              />
            ) : (
              <Text style={styles.nome}> {userData.nomeCompleto} </Text>
            )}
            
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Nome Social:</Text>
            {editing ?(
              <TextInput
                style={styles.nome}
                value={editedData.nomeSocial}
                onChangeText={(text) => setEditedData({ ...editedData, nomeSocial: text})}
              />
            ) : (
              <Text style={styles.nome}> {userData.nomeSocial} </Text>
            )}
            
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Data de Nascimento:</Text>
            {editing ?(
              <TextInput
                style={styles.nome}
                value={editedData.dataNasc}
                onChangeText={(text) => setEditedData({ ...editedData, dataNasc: text})}
              />
            ) : (
              <Text style={styles.nome}> {userData.dataNasc} </Text>
            )}
            
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.conjunto}>
          <View style={styles.textos}>
            <Text style={styles.tituloNome}>Email:</Text>
            {editing ?(
              <TextInput
                style={styles.nome}
                value={editedData.email}
                onChangeText={(text) => setEditedData({ ...editedData, email: text})}
              />
            ) : (
              <Text style={styles.nome}> {userData.email} </Text>
            )}
            
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
          </TouchableOpacity>
        </View>

        <View style={styles.conjunto}>
        <View style={styles.textos}>
            <Text style={styles.tituloNome}>Senha:</Text>
            {editing ?(
              <TextInput
                style={styles.nome}
                value={editedData.senha}
                onChangeText={(text) => setEditedData({ ...editedData, senha: text})}
              />
            ) : (
              <Text style={styles.nomeSenha}> {userData.senha} </Text>
            )}
            
          </View>
          <TouchableOpacity onPress={() =>{ handleEditToggle(); setShowModal(true)}}>
            <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
            {/* setShowModal(); */}
          </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <TouchableOpacity  onPress={() =>setShowModal(false)}>
                <Feather name='arrow-left' color={'black'} style={{marginRight: 20}}/>
              </TouchableOpacity>
              <Text style={styles.modalText}>{`Editar senha`}</Text>
            </View>
            <Text style={styles.label}>Digite sua senha antiga</Text>
            <View style={styles.modalInputContent}>
              <TextInput
                style={styles.input}
                placeholder='Senha antiga'
                /* value={nomeMae}
                onChangeText={setNomeMae} */
                onChangeText={setSenhaAntiga}
                secureTextEntry={secureTextEntryAntiga}
                placeholderTextColor='gray'
              />
              <TouchableOpacity onPress={esconderSenhaAntiga}>
                <Feather
                  name={secureTextEntryAntiga ? 'eye-off' : 'eye'}
                  color={'red'}
                  size={15}
                />
              </TouchableOpacity>
            </View>
          
            <Text style={styles.label}>Digite sua nova senha</Text>
            <View style={styles.modalInputContent}>
              <TextInput
                style={styles.input}
                placeholder='Nova senha'
                /* value={nomeMae}
                onChangeText={setNomeMae} */
                onChangeText={setSenha}
                secureTextEntry={secureTextEntry}
                placeholderTextColor='gray'
                
              />
              <TouchableOpacity onPress={esconderSenha}>
                <Feather
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  color={'red'}
                  size={15}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirme sua senha</Text>
            <View style={styles.modalInputContent}>
              <TextInput
                style={styles.input}
                placeholder='Confirmar senha'
                /* value={nomeMae}
                onChangeText={setNomeMae} */
                onChangeText={setConfirmsenha}
                secureTextEntry={secureTextEntryConfirm}
                placeholderTextColor='gray'
              />  
              <TouchableOpacity onPress={esconderConfirmSenha}>
                <Feather
                  name={secureTextEntryConfirm ? 'eye-off' : 'eye'}
                  color={'red'}
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#CB3EF5' }]}
                /* onPress={handleCancelPress} */
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  nomeSenha: {
    color: 'white',
    fontSize: 5,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  /* modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }, */
  modalButton: {
    height: 35,
    width: 55,
    backgroundColor: '#CB3EF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 15,
  },
  modalInputContent: {
    flexDirection: 'row',
  alignItems: 'center',
  },
});

export default TelaPerfil;
