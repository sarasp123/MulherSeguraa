import { Image, StyleSheet } from "react-native";


export default function Logo() {
    return (

        <Image
              source={require('../../img/logo.png')}
              style={styles.logo}
              
            />
    )
}

const styles = StyleSheet.create({
logo: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10,
    marginVertical: 10,
  },
})