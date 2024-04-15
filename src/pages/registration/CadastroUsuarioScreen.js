import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const windowWidth = Dimensions.get('window').width;

function UserRegistrationScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [formData, setFormData] = useState({
    nome: '',
    login: '',
    tipo: '',
    email: '',
    senha: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUserRegistration = () => {
    // Enviar os dados para a API aqui
    fetch('https://api-dracke-company.vercel.app/api/Controllers/UsuariosController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Dados cadastrados com sucesso') {
          Alert.alert('Cadastro realizado com sucesso');
        } else {
          Alert.alert('Erro ao cadastrar usuário', data.message);
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário', error);
      });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.cardsBook}>
        <Text style={styles.sectionTitle}>Cadastro de Usuário</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Login"
            value={formData.login}
            onChangeText={(text) => handleInputChange('login', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Tipo"
            value={formData.tipo}
            onChangeText={(text) => handleInputChange('tipo', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={formData.senha}
            onChangeText={(text) => handleInputChange('senha', text)}
            secureTextEntry // Para ocultar a senha
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleUserRegistration}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  cardsBook: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserRegistrationScreen;
