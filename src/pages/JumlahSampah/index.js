import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';

const { width } = Dimensions.get('window');

export default function JumlahSampah({ navigation }) {
  return (
    <View style={styles.container}>
      <MyHeader title="Jumlah Sampah" />

      <View style={styles.card}>
        <Text style={styles.tanggal}>20 Mei 2025</Text>

        <View style={styles.rowGroup}>
          <Text style={styles.label}>Daftar Sampah :</Text>
          <View style={styles.rowItem}>
            <Text style={styles.item}>1. Sampah Plastik</Text>
            <Text style={styles.value}>: 4 Kg</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.item}>2. Sampah Kardus</Text>
            <Text style={styles.value}>: 10 Kg</Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>Jumlah</Text>
          <Text style={[styles.total, { color: colors.primary }]}>: Rp25.000</Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    margin: 20,
    padding: 16,
  },
  tanggal: {
    alignSelf: 'flex-end',
    color: '#aaa',
    marginBottom: 10,
    fontSize: 13,
    fontFamily: fonts.primary[400],
  },
  rowGroup: {
    marginBottom: 10,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  item: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.primary[400],
  },
  value: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.primary[400],
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primary[600],
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
  },
});
