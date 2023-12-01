import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';


import dataAssistencias from '../data/Assistencias';


const TelaCadastrados = () => {
  const navigation = useNavigation();
  const assistencias = dataAssistencias;

  const [expanded, setExpanded] = useState(null);
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nomeCompleto: userData.nomeCompleto || '',
    tel: userData.tel || '',
  });

  const toggleExpanded = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  const handleEditToggle = () => {
    if (editing) {
      // Enviar dados editados para o backend
      sendEditedData();
    }
    setEditing(!editing);
  };

  const sendEditedData = async () => {
    try {
      await axios.post('http://10.11.34.130:3000/atualizarRede', {
        nomeCompleto: editedData.nomeCompleto,
        tel: editedData.tel,
      });
    } catch (error) {
      console.error('Erro ao atualizar dados da rede:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.11.34.130:3000/numerosRede');
        setUserData(response.data);
        setEditedData({
          nomeCompleto: response.data.nomeCompleto || '',
          tel: response.data.tel || '',
        });
      } catch (error) {
        console.error('Erro ao buscar dados da rede:', error);
      }
    };
  
    fetchData();
  }, []);

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
            <TextInput
              style={styles.nome}
              value={editedData.tel}
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