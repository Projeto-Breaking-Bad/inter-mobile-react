import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import MenuScreen from './src/pages/MenuScreen';
import MetricaScreen from './src/pages/MetricaScreen';
import NewsScreen from './src/pages/NewsScreen';
import MaisScreen from './src/pages/MaisScreen';
import CadastroAlunoScreen from './src/pages/registration/student/CadastroAlunoScreen';
import EdicaoAlunoScreen from './src/pages/registration_editing/student/EdicaoAlunoScreen';
import CadastroEmpresaScreen from './src/pages/registration/company/CadastroEmpresaScreen';
import EdicaoEmpresaScreen from './src/pages/registration_editing/company/EdicaoEmpresaScreen';
import CadastroVagaScreen from './src/pages/registration/vacancies/CadastroVagaScreen';
import EdicaoVagaScreen from './src/pages/registration_editing/vacancies/EdicaoVagaScreen';
import LoginScreen from './src/pages/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tela principal que contém as tabs
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Página Inicial"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false, // Esconde a barra superior
        }}
      />
      <Tab.Screen
        name="Métricas"
        component={MetricaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" color={color} size={size} />
          ),
          headerShown: false, // Esconde a barra superior
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="copy" color={color} size={size} />
          ),
          headerShown: false, // Esconde a barra superior
        }}
      />
      <Tab.Screen
        name="Mais"
        component={MaisScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false, // Esconde a barra superior
        }}
      />
    </Tab.Navigator>
  );
}

// Navegação principal que envolve as tabs e outras telas
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Aqui você pode verificar se o usuário está logado
    // e definir setIsLoggedIn(true) se necessário.
    // Isso pode ser uma chamada assíncrona para a API. :)
  }, []);
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastroAlunoScreen"
            component={CadastroAlunoScreen}
            options={{ title: 'Cadastro de Aluno' }}
          />
          <Stack.Screen
            name="EdicaoAlunoScreen"
            component={EdicaoAlunoScreen}
            options={{ title: 'Edição de Aluno' }}
          />
          <Stack.Screen
            name="CadastroEmpresaScreen"
            component={CadastroEmpresaScreen}
            options={{ title: 'Cadastro de Empresa' }}
          />
          <Stack.Screen
            name="EdicaoEmpresaScreen"
            component={EdicaoEmpresaScreen}
            options={{ title: 'Edição de Empresa' }}
          />
          <Stack.Screen
            name="CadastroVagaScreen"
            component={CadastroVagaScreen}
            options={{ title: 'Cadastro de Vaga' }}
          />
          <Stack.Screen
            name="EdicaoVagaScreen"
            component={EdicaoVagaScreen}
            options={{ title: 'Edição de Vaga' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  }
}
export default App;
