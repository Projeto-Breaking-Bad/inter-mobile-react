import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

const HeaderGender = () => {
  return (
    <React.Fragment>
      <View style={styles.headerGender}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.genreContainer}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Explorar</Text>
          </TouchableOpacity>
          <View style={styles.borderWidth}></View>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Comercial, Vendas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Telemarketing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Logística</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Gastronomia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Administração</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Industrial, Produção</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Serviços Gerais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Construção</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>TI, Telecomunicações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Segurança</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Finanças, Economia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genreButton}>
            <Text style={styles.genreText}>Saúde</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headerGender: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  genreContainer: {
    paddingBottom: 10,
  },
  genreButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  borderWidth: {
    width: 1,
    backgroundColor: 'lightgray',
    marginHorizontal: 10,
  },
  genreText: {
    fontFamily: 'Roboto_Regular',
    fontSize: 16,
  },
});

export default HeaderGender;
