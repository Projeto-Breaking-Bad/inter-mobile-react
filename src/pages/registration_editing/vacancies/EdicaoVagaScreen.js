import React, { useState, useEffect } from 'react';
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

function EdicaoVagaScreen({ route }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  // Recupere os dados da vaga da rota (ou de onde você armazenou esses dados)
  const { vagaParaEditar } = route.params;

  const [formData, setFormData] = useState({
    horas: vagaParaEditar.horas.toString(),
    cnpj: vagaParaEditar.cnpj,
    linkLogo: vagaParaEditar.linkLogo,
    areaAtuacao: vagaParaEditar.areaAtuacao,
    salario: vagaParaEditar.salario,
    requisitos: vagaParaEditar.requisitos,
    quantVagas: vagaParaEditar.quantVagas.toString(),
    descricao: vagaParaEditar.descricao,
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleEdicao = () => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/VagasController',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: vagaParaEditar.id,
          ...formData,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Erro na requisição PUT: ${response.status} - ${response.statusText}`
          );
        }
      })
      .then((data) => {
        if (data.message) {
          Alert.alert('Edição Realizada', data.message);
        } else {
          Alert.alert(
            'Erro na Edição',
            'Ocorreu um erro ao realizar a edição.'
          );
        }
      })
      .catch((error) => {
        console.error('Erro ao editar dados', error);
        Alert.alert('Erro na Edição', 'Ocorreu um erro ao realizar a edição.');
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
              Informações a serem modificadas
            </Text>
            <Text style={styles.headerDateText}>{getFormattedLocalDate()}</Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="pencil" size={24} color="white" />
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
        <TouchableOpacity style={styles.submitButton} onPress={handleEdicao}>
          <Text style={styles.submitButtonText}>Atualizar Vaga</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default EdicaoVagaScreen;
