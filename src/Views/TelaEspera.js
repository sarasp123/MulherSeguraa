import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TelaEspera = () => {
  const navigation = useNavigation();

  const useRef = (initialValue) => {
    const [value, setValue] = useState(initialValue);
  
    return {
      current: value,
      setValue: setValue,
    };
  };

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const tempo = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate("TelaLogin");
      });
    }, 3000);

    return () => clearTimeout(tempo);
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../img/logo.png')}
        style={{
          width: 245,
          height: 200,
          opacity: opacity,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TelaEspera;