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

function CadastroAlunoScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [formData, setFormData] = useState({
    nome: '',
    ra: '',
    cpf: '',
    dataNasc: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    whatsapp: '',
    curso: '',
    habilidades: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCEPLookup = () => {
    const { cep } = formData;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          Alert.alert(
            'CEP não encontrado',
            'Verifique o CEP e tente novamente.'
          );
        } else {
          setFormData({
            ...formData,
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do CEP', error);
      });
  };

  const handleCadastro = () => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/AlunosCompleteController',
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
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            maxLength={100}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="RA"
            value={formData.ra}
            onChangeText={(text) => handleInputChange('ra', text)}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={formData.cpf}
            onChangeText={(text) => handleInputChange('cpf', text)}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento"
            value={formData.dataNasc}
            onChangeText={(text) => handleInputChange('dataNasc', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={formData.cep}
            onChangeText={(text) => handleInputChange('cep', text)}
            onBlur={handleCEPLookup}
            keyboardType="numeric"
            maxLength={8}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Logradouro"
            value={formData.logradouro}
            onChangeText={(text) => handleInputChange('logradouro', text)}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={formData.numero}
            onChangeText={(text) => handleInputChange('numero', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={formData.complemento}
            onChangeText={(text) => handleInputChange('complemento', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={formData.bairro}
            onChangeText={(text) => handleInputChange('bairro', text)}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={formData.cidade}
            onChangeText={(text) => handleInputChange('cidade', text)}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="UF"
            value={formData.uf}
            onChangeText={(text) => handleInputChange('uf', text)}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={formData.telefone}
            onChangeText={(text) => handleInputChange('telefone', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChangeText={(text) => handleInputChange('whatsapp', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Curso"
            value={formData.curso}
            onChangeText={(text) => handleInputChange('curso', text)}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Habilidades"
            value={formData.habilidades}
            onChangeText={(text) => handleInputChange('habilidades', text)}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
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

export default CadastroAlunoScreen;