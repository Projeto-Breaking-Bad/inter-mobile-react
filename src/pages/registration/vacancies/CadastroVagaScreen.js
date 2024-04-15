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
  ImageBackground,
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

function BackgroundSection({ children }) {
  return (
    <ImageBackground
      source={require('../../../../assets/img/5199419.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  );
}

function CadastroVagaScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [formData, setFormData] = useState({
    horas: '',
    cnpj: '',
    linkLogo: '',
    areaAtuacao: '',
    salario: '',
    requisitos: '',
    quantVagas: '',
    descricao: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCadastro = () => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/VagasController',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Alert.alert('Cadastro Realizado', data.message);
        } else {
          Alert.alert(
            'Erro no Cadastro',
            'Ocorreu um erro ao realizar o cadastro.'
          );
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar dados', error);
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao realizar o cadastro.'
        );
      });
  };

  const getFormattedLocalDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date().toLocaleDateString(undefined, options);
    return formattedDate;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackgroundSection>
        <View style={styles.headerGender}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitleText}>
              Digite os dados de cadastro
            </Text>
            <Text style={styles.headerDateText}>{getFormattedLocalDate()}</Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="address-card" size={24} color="white" />
          </View>
        </View>
      </BackgroundSection>
      <View style={styles.cardsBook}>
        <Text style={styles.sectionTitle}>Informações da Vaga</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Horas"
            value={formData.horas}
            onChangeText={(text) => handleInputChange('horas', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="CNPJ"
            value={formData.cnpj}
            onChangeText={(text) => handleInputChange('cnpj', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Link da Logo"
            value={formData.linkLogo}
            onChangeText={(text) => handleInputChange('linkLogo', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Área de Atuação"
            value={formData.areaAtuacao}
            onChangeText={(text) => handleInputChange('areaAtuacao', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Salário"
            value={formData.salario}
            onChangeText={(text) => handleInputChange('salario', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Requisitos"
            value={formData.requisitos}
            onChangeText={(text) => handleInputChange('requisitos', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Quantidade de Vagas"
            value={formData.quantVagas}
            onChangeText={(text) => handleInputChange('quantVagas', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={formData.descricao}
            onChangeText={(text) => handleInputChange('descricao', text)}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
          <Text style={styles.submitButtonText}>Cadastrar Vaga</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsBook: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerGender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  headerTextContainer: {
    marginRight: 15,
  },
  headerIconContainer: {
    // Estilos para o contêiner do ícone ou imagem à direita
  },
  headerTitleText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  headerDateText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Ajuste a opacidade conforme necessário
  },
});

export default CadastroVagaScreen;
