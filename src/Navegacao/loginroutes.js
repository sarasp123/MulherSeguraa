
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TelaLogin from '../Views/TelaLogin';

const Stack = createStackNavigator();

const Login = () => (
  <Stack.Navigator>
    <Stack.Screen name="TelaLogin" component={TelaLogin} />
  </Stack.Navigator>
);

export default Login;