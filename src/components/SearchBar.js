import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default SearchBar;