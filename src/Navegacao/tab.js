import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import TelaInicial from "../Views/TelaInicial";

const Tab = createBottomTabNavigator();

export default function AppTab() {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="feed" component={TelaInicial} 
                options={{ 
                    tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: 'Início'
                }}
            />
        </Tab.Navigator>
    )
}
