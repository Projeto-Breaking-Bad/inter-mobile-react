// EmpresaList.js
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
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Table, Row, Rows } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

function EmpresaList() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Roboto_Regular: Roboto_400Regular,
  });

  const [empresasData, setEmpresasData] = useState([]);
  const [tableHead, setTableHead] = useState([
    'Nome',
    'Área de Negócio',
    'Ações',
  ]);

  useEffect(() => {
    fetch(
      'https://api-dracke-company.vercel.app/api/Controllers/EmpresasController'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados da API:', data);
        setEmpresasData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API', error);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleEdit = (id) => {
    const empresaParaEditar = empresasData.find((empresa) => empresa.id === id);
    navigation.navigate('EdicaoEmpresaScreen', { empresaParaEditar });
  };

  const handleDelete = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir esta empresa?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          fetch(
            'https://api-dracke-company.vercel.app/api/Controllers/EmpresasController',
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
                setEmpresasData((prevData) =>
                  prevData.filter((empresa) => empresa.id !== id)
                );
                Alert.alert('Sucesso', 'Empresa excluída com sucesso.');
              } else {
                Alert.alert('Erro', 'Erro ao excluir empresa.');
              }
            })
            .catch((error) => {
              console.error('Erro na requisição DELETE', error);
              Alert.alert('Erro', 'Erro ao excluir empresa.');
            });
        },
      },
    ]);
  };

  const handleAdd = () => {
    navigation.navigate('CadastroEmpresaScreen');
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.cardContainer}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.cardsBook}>
        <View style={styles.genreContainer}>
          <FontAwesome
            name="building"
            size={20}
            color="black"
            style={styles.iconCard}
          />
          <Text style={styles.genreText}>Empresas</Text>
        </View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row
            data={tableHead}
            widthArr={[windowWidth / 2.5, windowWidth / 2.5, windowWidth / 4]}
            style={styles.headerRow}
            textStyle={styles.headerText}
          />
          <Rows
            data={empresasData.map((empresa) => [
              empresa.nome,
              empresa.areaNegocio,
              <View style={styles.actionsContainer} key={empresa.id}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(empresa.id)}>
                  <FontAwesome name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(empresa.id)}>
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>,
            ])}
            widthArr={[windowWidth / 2.5, windowWidth / 2.5, windowWidth / 4]}
            textStyle={styles.rowText}
          />
        </Table>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Adicionar Empresa</Text>
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

export default EmpresaList;
