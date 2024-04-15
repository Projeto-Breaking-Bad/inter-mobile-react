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
  Linking,
  Platform,
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Search from '../components/SearchBar';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { differenceInDays } from 'date-fns';

const windowWidth = Dimensions.get('window').width;

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

function NewsScreen() {
  const [newsData, setNewsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openModalWithArticle = (article) => {
    setSelectedArticle(article);
    toggleModal();
  };

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/everything?q=curso+gratuito&language=pt&sortBy=publishedAt&apiKey=bce250e04146430b847c90b11eec9fd4'
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
        setNewsData(data.articles);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API', error);
      });
  }, []);

  const getPublishedDaysAgo = (publishedAt) => {
    const today = new Date();
    const publishedDate = new Date(publishedAt);
    const daysAgo = differenceInDays(today, publishedDate);

    if (daysAgo === 1) {
      return '1 dia atrás';
    } else {
      return `${daysAgo} dias atrás`;
    }
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

  const openInBrowser = (url) => {
    Linking.openURL(url);
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
            <Text style={styles.newsTitleText}>Seu resumo de notícias</Text>
            <Text style={styles.newsDateText}>{getFormattedLocalDate()}</Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="newspaper-o" size={24} color="white" />
          </View>
        </View>
      </BackgroundSection>
      {newsData.map((article, index) => (
        <View style={styles.cardsBook} key={index}>
          <View style={styles.cardHeader}>
            <View style={styles.genreContainer}>
              <FontAwesome
                name="newspaper-o"
                size={20}
                color="black"
                style={styles.iconCard}
              />
              <Text style={styles.genreTextLeft}>{article.source.name}</Text>
            </View>
            {article.publishedAt && (
              <Text style={styles.genreTextRight}>
                {getPublishedDaysAgo(article.publishedAt)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => openModalWithArticle(article)}>
            <Image
              source={{ uri: article.urlToImage }}
              style={styles.bookCover}
            />
            <Text style={styles.cardTitle}>{article.title}</Text>
            <Text style={styles.cardSubTitle}>{article.description}</Text>
          </TouchableOpacity>
          <View style={styles.borderSpace}></View>
          <View style={styles.seeAll}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => openInBrowser(article.url)}>
              <Text style={styles.seeAllText}>Ver tudo</Text>
            </TouchableOpacity>
            <View style={styles.seeAllIcon}>
              <FontAwesome name="chevron-right" size={18} color="#1E90FF" />
            </View>
          </View>
        </View>
      ))}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {selectedArticle ? (
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedArticle.urlToImage }}
              style={styles.modalBookCover}
            />
            <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
            <Text style={styles.modalSubTitle}>
              {selectedArticle.description}
            </Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={toggleModal}>
              <Text style={styles.closeModalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando...</Text>
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
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
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
  cardsBook: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
    marginHorizontal: 6,
    borderRadius: 10,
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
    marginBottom: 10,
  },
  bookCover: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
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
  notificationButton: {
    marginRight: 10,
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
  newsTitleText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  newsDateText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genreTextLeft: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    color: 'black',
  },
  genreTextRight: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    textAlign: 'right',
    color: 'gray',
  },
  borderSpace: {
    height: 1,
    backgroundColor: 'lightgray',
    marginTop: 5,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
  },
  seeAllIcon: {
    marginLeft: 'auto',
  },
  seeAllText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 15,
    color: '#1E90FF',
  },
  iconCard: {
    marginRight: 5,
    color: 'gray',
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewsScreen;
