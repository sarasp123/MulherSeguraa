import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';


const TelaCadastrados = () => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(null);
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [existe, setExiste] = useState(false);
  const [editedData, setEditedData] = useState({
    nomeCompleto: userData.nomeCompleto || '',
    tel: userData.tel || '',
  });


  const handleEditToggle = () => {
    if (editing) {
      // Enviar dados editados para o backend
      sendEditedData();
    }
    setEditing(!editing);
  };

  const sendEditedData = async () => {
    try {
      await axios.post('http://10.11.34.95:3000/atualizarRede', {
        nomeCompleto: editedData.nomeCompleto,
        tel: editedData.tel,
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
        const response = await axios.post('http://10.11.34.95:3000/verificarRede');
        setUserData(response.data);
        const newData = response.data;

        if(dataChanged){
          Alert.alert('Atualização', 'Os dados da sua rede de apoio foram atualizados')
          setDataChanged(false)
        }
        setExiste(true)
        setUserData(newData);
        setEditedData({
          nomeCompleto: userData.nomeCompleto || '',
          tel: userData.tel || '',
        })
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      }
    };
  
    fetchData();

  }, [dataChanged]);

  if (!existe) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Rede de apoio não cadastrada</Text>
      </View>
    );
  }else{ 

  return (
    
    <View style={styles.container}>
        
    <View style={styles.conjunto}>
      <View>
        <Text style={styles.tituloNome}>Nome:</Text>
        {editing ? (
            <TextInput
              style={styles.nome}
              value={editedData.nomeCompleto}
              onChangeText={(text) => setEditedData({ ...editedData, nomeCompleto: text })}
            />
          ) : (
            <Text style={styles.nome}>{userData.nomeCompleto}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleEditToggle}>
          <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
        </TouchableOpacity>
      </View>

      <View style={styles.conjunto}>
        <View>
          <Text style={styles.tituloNome}>Telefone:</Text>
          {editing ? (
            <TextInputMask
              style={styles.nome}
              value={editedData.tel}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              onChangeText={(text) => setEditedData({ ...editedData, tel: text })}
            />
          ) : (
            <Text style={styles.nome}>{userData.tel}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleEditToggle}>
          <Feather name={editing ? 'check' : 'edit-2'} color={'white'} size={25} marginRight={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
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
export default TelaCadastrados;