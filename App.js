import React from "react";
import { SafeAreaView } from "react-native";
import AppStack from "./src/Navegacao/routes";


export default function App() {
  return (
    
      <SafeAreaView style={{ flex: 1 }}>
        <AppStack />
      </SafeAreaView>
    
  );
}
