import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Search from '../components/SearchBar';
import HeaderGender from '../components/headerGender';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BackgroundSection({ children }) {
  return (
    <ImageBackground
      source={require('../../assets/img/5199419.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  );
}

function MenuScreen() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/VagasController'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Erro na resposta da API: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API', error);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const groupedVagas = {};

  data.forEach((vaga) => {
    const area = vaga.areaAtuacao;

    if (!groupedVagas[area]) {
      groupedVagas[area] = [];
    }

    groupedVagas[area].push(vaga);
  });

  const toggleModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(!isModalVisible);
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

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <BackgroundSection>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.searchContainer}>
              <Search />
            </View>
          </View>
        </View>
        <View style={styles.headerGender}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.vacanciesTitleText}>Seu resumo de vagas</Text>
            <Text style={styles.vacanciesDateText}>
              {getFormattedLocalDate()}
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="suitcase" size={24} color="white" />
          </View>
        </View>
        <HeaderGender />
      </BackgroundSection>

      {Object.keys(groupedVagas).map((area, index) => (
        <View key={index} style={styles.cardsBook}>
          <View style={styles.genreContainer}>
            <FontAwesome
              name="book"
              size={24}
              color="black"
              style={styles.iconCard}
            />
            <Text style={styles.genreText}>{area}</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.cardContainer}
            showsHorizontalScrollIndicator={false}>
            {groupedVagas[area].map((vaga, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cardButton}
                onPress={() => toggleModal(vaga)}>
                <Image
                  source={{
                    uri: vaga.linkLogo,
                  }}
                  style={styles.bookCover}
                />
                <Text style={styles.cardTitle}>{vaga.areaAtuacao}</Text>
                <Text style={styles.cardSubTitle}>
                  Salário: {vaga.salario}, Vagas: {vaga.quantVagas}, Horas:{' '}
                  {vaga.horas}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Biblioteca')}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Explorar')}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Mais')}></TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal(null)}>
        {selectedItem && (
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: selectedItem.linkLogo,
              }}
              style={styles.modalBookCover}
            />
            <Text style={styles.modalTitle}>{selectedItem.areaAtuacao}</Text>
            <Text style={styles.modalSubTitle}>{selectedItem.descricao}</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => toggleModal(null)}>
              <Text style={styles.closeModalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Ajuste a opacidade conforme necessário
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
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_Regular',
    color: 'black',
  },
  cardSubTitle: {
    fontSize: 12,
    fontFamily: 'Roboto_Regular',
    color: 'gray',
  },
  vacanciesTitleText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  vacanciesDateText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  cardsBook: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  cardContainer: {
    paddingBottom: 10,
    marginTop: 15,
  },
  cardButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  bookCover: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  genreText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    marginTop: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: windowWidth - 40,
    alignItems: 'center',
  },
  modalBookCover: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalSubTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconCard: {
    marginHorizontal: 5,
    color: 'gray',
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default MenuScreen;
