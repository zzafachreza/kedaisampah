import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MyGap, MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import moment from 'moment';
import { FlatList } from 'react-native';

const { width } = Dimensions.get('window');

export default function JumlahSampah({ navigation }) {
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData('user').then(u => {
        axios.post(apiURL + 'setor', {
          fid_pengguna: u.id_pengguna
        }).then(res => {
          console.log(JSON.parse(res.data[0].pesan));
          setData(res.data);
        })
      })
    }
  }, [isFocus])

  function formatRupiah(value) {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return `Rp${formatted}`;
  }
  return (
    <View style={styles.container}>
      <MyHeader title="Jumlah Sampah" />

      <View style={{
        flex: 1,
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <View style={styles.card}>
              <Text style={styles.tanggal}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
              <View style={styles.rowGroup}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.secondary,
                }}>Daftar Sampah :</Text>
                <MyGap jarak={5} />
                {JSON.parse(item.pesan).map((i, index) => {
                  return (
                    <View style={{
                      flexDirection: 'row'
                    }}>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary
                      }}>{index + 1}. </Text>
                      <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary
                      }}>{i.nama}</Text>
                      <Text style={{
                        flex: 0.1,
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary
                      }}>:</Text>
                      <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary
                      }}>{i.berat} kg</Text>
                    </View>
                  )
                })}
                <MyGap jarak={5} />
                <View style={styles.rowItem}>
                  <Text style={styles.item}>Total</Text>
                  <Text style={styles.item}>{formatRupiah(item.total)}</Text>
                </View>

              </View>

              <View style={styles.totalRow}>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Jumlah</Text>
                <Text style={[styles.total, { color: colors.primary }]}>: Rp25.000</Text>
              </View>
            </View>
          )
        }} />
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
    textAlign: 'center',
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
    fontFamily: fonts.secondary[800],
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
