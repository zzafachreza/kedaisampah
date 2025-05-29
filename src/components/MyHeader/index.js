import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // pastikan kamu sudah install

const { width } = Dimensions.get('window');

export default function MyHeader({ title = 'Daftar' }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 24, marginRight: 15 }} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0B9444',
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
