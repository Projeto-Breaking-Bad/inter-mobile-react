import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import Search from '../components/SearchBar';
import { LineChart } from 'react-native-chart-kit';
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

function MetricaScreen() {
  const [empresasData, setEmpresasData] = useState([]);
  const [alunosData, setAlunosData] = useState([]);
  const [vagasData, setVagasData] = useState([]);

  useEffect(() => {
    // Fetch data from APIs and update state
    // Replace the following with your API calls
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/EmpresasController'
    )
      .then((response) => response.json())
      .then((data) => setEmpresasData(data))
      .catch((error) => console.error('Error fetching empresas data', error));

    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/AlunosCompleteController'
    )
      .then((response) => response.json())
      .then((data) => setAlunosData(data))
      .catch((error) => console.error('Error fetching alunos data', error));

    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/VagasController'
    )
      .then((response) => response.json())
      .then((data) => setVagasData(data))
      .catch((error) => console.error('Error fetching vagas data', error));
  }, []);

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
              Seu resumo de métricas
            </Text>
            <Text style={styles.registrationsDateText}>
              {getFormattedLocalDate()}
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            <FontAwesome name="line-chart" size={24} color="white" />
          </View>
        </View>
      </BackgroundSection>
      <View style={styles.cardsBook}>
        {/* Render Empresa Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Empresas Cadastradas</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [empresasData.length, 10, 5, 2, 20, 30],
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
      <View style={styles.cardsBook}>
        {/* Render Alunos Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Alunos Cadastrados</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [alunosData.length, 15, 10, 5, 25, 35],
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
      <View style={styles.cardsBook}>
        {/* Render Vagas Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Vagas Cadastradas</Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [vagasData.length, 8, 3, 1, 10, 15],
                },
              ],
            }}
            width={Dimensions.get('window').width - 40} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
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
    marginTop: 10,
    marginHorizontal: 6,
    borderRadius: 10,
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
  chartContainer: {
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MetricaScreen;
