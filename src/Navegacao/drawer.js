import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TelaPerfil from '../Views/TelaPerfil'
import TelaCamuflada from '../Views/TelaCamuflada'
import TelaTutorial from '../Views/TelaTutorial'
import TelaInicial from "../Views/TelaInicial";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
    
      <Drawer.Screen name="TelaPerfil" component={TelaPerfil} />
      <Drawer.Screen name="TelaCamuflada" component={TelaCamuflada} />
      <Drawer.Screen name="TelaTutorial" component={TelaTutorial} />
    </Drawer.Navigator>
    
  );
}
