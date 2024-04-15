import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';

function BackgroundSection({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/img/5199419.jpg')}
      style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
}

function LoginScreen({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    if (username === 'admin' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <BackgroundSection>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        {/* <Text style={styles.label}>Nome de Usuário:</Text> */}
        <View style={styles.logoContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/img/cacatalentoswhite2.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Bem vindo de volta</Text>
        </View>
        <TextInput
          style={styles.inputUsername}
          onChangeText={setUsername}
          value={username}
          placeholder="Nome de Usuário"
        />
        {/* <Text style={styles.label}>Senha:</Text> */}
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Esqueceu a senha',
                'Enviamos instruções para o seu e-mail.'
              );
            }}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('Navigate to Sign Up');
            }}>
            <Text style={styles.signUpText}>
              Não tem uma conta? Inscrever-se{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackgroundSection>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 140,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 35,
    fontWeight: 'bold',
  },
  inputUsername: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 25,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 16,
    // textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
    // textDecorationLine: 'underline',
  },
});

export default LoginScreen;
