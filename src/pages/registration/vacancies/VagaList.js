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
  Image,
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Table, Row, Rows } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function VagaList() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [vagasData, setVagasData] = useState([]);
  const [tableHead, setTableHead] = useState([
    'Empresa',
    'Área de Atuação',
    'Ações',
  ]);

  useEffect(() => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/VagasController'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados da API:', data);
        setVagasData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API', error);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleEdit = (id) => {
    const vagaParaEditar = vagasData.find((vaga) => vaga.id === id);
    navigation.navigate('EdicaoVagaScreen', { vagaParaEditar });
  };

  const handleDelete = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir esta vaga?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          fetch(
            'https://api-dracke-company.vercel.app/api/Controllers/VagasController',
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id }),
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  `Erro na requisição DELETE: ${response.status} - ${response.statusText}`
                );
              }
            })
            .then((data) => {
              console.log('Resposta da API DELETE:', data);
              if (data.message === 'Dados excluídos com sucesso') {
                setVagasData((prevData) =>
                  prevData.filter((vaga) => vaga.id !== id)
                );
                Alert.alert('Sucesso', 'Vaga excluída com sucesso.');
              } else {
                Alert.alert('Erro', 'Erro ao excluir vaga.');
              }
            })
            .catch((error) => {
              console.error('Erro na requisição DELETE', error);
              Alert.alert('Erro', 'Erro ao excluir vaga.');
            });
        },
      },
    ]);
  };

  const handleAdd = () => {
    navigation.navigate('CadastroVagaScreen');
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.cardContainer}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.cardsBook}>
        <View style={styles.genreContainer}>
          <FontAwesome
            name="address-card"
            size={20}
            color="black"
            style={styles.iconCard}
          />
          <Text style={styles.genreText}>Vagas</Text>
        </View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row
            data={tableHead}
            widthArr={[windowWidth / 2.5, windowWidth / 2.5, windowWidth / 4]}
            style={styles.headerRow}
            textStyle={styles.headerText}
          />
          <Rows
            data={vagasData.map((vaga) => [
              <View key={vaga.id} style={styles.logoContainer}>
                <Image style={styles.logo} source={{ uri: vaga.linkLogo }} />
              </View>,
              vaga.areaAtuacao,
              <View style={styles.actionsContainer} key={vaga.id}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(vaga.id)}>
                  <FontAwesome name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(vaga.id)}>
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>,
            ])}
            widthArr={[windowWidth / 2.5, windowWidth / 2.5, windowWidth / 4]}
            textStyle={styles.rowText}
          />
        </Table>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Adicionar Vaga</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardsBook: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  headerRow: {
    height: 40,
    backgroundColor: '#537791',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  rowText: {
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  genreText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 17,
    marginTop: 5,
  },
  iconCard: {
    marginHorizontal: 5,
    color: 'gray',
  },
});

export default VagaList;
