import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const dataBotol = [
  { id: '1', nama: 'Botol Plastik Le Minare', harga: 'Rp5.000/kg', image: require('../../assets/botol_plastik.png') },
  { id: '2', nama: 'Botol Plastik Aqua', harga: 'Rp5.000/kg', image: require('../../assets/botol_plastik.png') },
  { id: '3', nama: 'Botol Plastik Ades', harga: 'Rp5.000/kg', image: require('../../assets/botol_plastik.png') },
  { id: '4', nama: 'Botol Plastik Pristine', harga: 'Rp5.000/kg', image: require('../../assets/botol_plastik.png') },
];

export default function BotolPlastik({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.nama}>{item.nama}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.harga}>{item.harga}</Text>
          <TouchableOpacity>
            <Icon type='ionicon' name='cart-outline' size={20} color={colors.secondary}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyHeader title="Botol Plastik" />
      <FlatList
        data={dataBotol}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    width: itemWidth,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 110,
  },
  cardContent: {
    padding: 10,
  },
  nama: {
    fontFamily: fonts.primary[600],
    fontSize: 13,
    color: '#000',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  harga: {
    fontFamily: fonts.primary[500],
    fontSize: 12,
    color: '#0B9444',
  },
  iconCart: {
    width: 18,
    height: 18,
    tintColor: '#0B9444',
  },
});
