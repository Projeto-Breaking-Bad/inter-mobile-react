import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import Search from '../components/SearchBar';
import HeaderGender from '../components/headerGender';
import AlunoList from './registration/student/AlunoList';
import EmpresaList from './registration/company/EmpresaList';
import VagaList from './registration/vacancies/VagaList';
import { FontAwesome } from '@expo/vector-icons';

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

function MaisScreen({ isLoggedIn }) {
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
            <Text style={styles.registrationsTitleText}>
              Seu resumo de cadastros
            </Text>
            <Text style={styles.registrationsDateText}>
              {getFormattedLocalDate()}
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="table" size={24} color="white" />
          </View>
        </View>
      </BackgroundSection>
      <AlunoList />
      <EmpresaList />
      <VagaList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  registrationsTitleText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  registrationsDateText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
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
});

export default MaisScreen;
