import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'; // Importe Text para um botão personalizado
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";


const TelaInicial = () => {
  const navigation = useNavigation();

  return (
    <>
    
        <View style={styles.cabecalho}>
        <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: 10,
          zIndex: 1,
        }}
      >
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
            <View style={styles.AAA}>
            <Image
              source={require('../../img/logo.png')}
              style={styles.logo}
              
            />
                <Text style={styles.ola}>Olá, NOME</Text>
            </View>
        </View>

        <View style={styles.container}>
        <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.delegacias}
          onPress={() => {
            navigation.navigate('TelaDelegacias');
          }}
          >
        <Image
            source={require('../../img/Sirene.png')}
            style={styles.imgs} 
        />
        <Text style={styles.textButtons}>Delegacias Próximas</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.assistencia}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/admin.png')} 
            style={styles.imgs}
        />
        <Text style={styles.textButtons}>Órgãos de assistência à mulher</Text> 
        </TouchableOpacity>

        </View>
        <View style={styles.buttonContainer2}>

        <TouchableOpacity
          style={styles.rede}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/Mao.png')} 
            style={styles.imgs}
        />
        <Text style={styles.textButtons}>Rede de apoio</Text> 
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tipos}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/mulher.png')} 
            style={styles.imgs}
        />
        <Text style={styles.textButtons}>Tipos de violência</Text> 
        </TouchableOpacity>

        </View>
        </View>

        {/* <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.notificacoes}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/notificacoes.png')} 
            style={styles.imgsRodape}
        />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.house}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/house.png')} 
            style={styles.imgsRodape}
        />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mic}
          onPress={() => {
            // Adicione a lógica de navegação aqui
            // Por exemplo: navigation.navigate('TelaPrincipal');
          }}
          >
        <Image
            source={require('../../img/mic.png')} 
            style={styles.imgsRodape}
        />
        </TouchableOpacity>
        </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cabecalho: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 150,
  },
  AAA: {
    flexDirection: 'column',
    height: 140,
    backgroundColor: '#D9D9D9',
    width: 360,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  ola: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delegacias: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    marginLeft: 28,
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtons: {
    color: 'white',
    fontWeight: 'bold',
  },
  assistencia: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  imgs: {
    width: 70,
    height: 70,
  },
  buttonContainer2: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10, 
  },
  rede: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    marginLeft: 28,
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipos: {
    width: 147,
    height: 147,
    backgroundColor: 'black',
    borderWidth: 7,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28,
  },
  rodape: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'black'
  },
  imgsRodape: {
    width: 35,
    height: 35,
  },
});

export default TelaInicial;
