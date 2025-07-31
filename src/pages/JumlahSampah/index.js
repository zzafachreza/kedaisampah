import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {MyGap, MyHeader} from '../../components';
import {colors, fonts} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import {apiURL, getData} from '../../utils/localStorage';
import axios from 'axios';
import moment from 'moment';

const {width} = Dimensions.get('window');

export default function JumlahSampah({navigation}) {
  const [data, setData] = useState({
    setor: [],
    tarik: [],
  });
  const [activeTab, setActiveTab] = useState('setor'); // 'setor' atau 'tarik'
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData('user').then(u => {
        axios
          .post(apiURL + 'transaksi', {
            fid_pengguna: u.id_pengguna,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocus]);

  function formatRupiah(value) {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    return `Rp${formatted}`;
  }

  // Render item untuk transaksi setor (jual sampah)
  const renderSetorItem = ({item, index}) => {
    const pesananArray = JSON.parse(item.pesan);

    return (
      <View style={styles.card}>
        <Text style={styles.tanggal}>
          {moment(item.tanggal).format('DD MMMM YYYY')} - {item.jam}
        </Text>

        <View style={styles.rowGroup}>
          <View style={styles.rowItem}>
            <Text style={styles.item}>Kode Transaksi</Text>
            <Text style={styles.value}>{item.kode}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.item}>Status</Text>
            <Text
              style={[
                styles.value,
                {
                  color:
                    item.status_setor === 'Berhasil' ? '#4CAF50' : '#FF9800',
                },
              ]}>
              {item.status_setor}
            </Text>
          </View>
        </View>

        <View style={styles.rowGroup}>
          <Text style={[styles.item, {marginBottom: 5}]}>Detail Sampah:</Text>
          {pesananArray.map((pesanan, idx) => (
            <View key={idx} style={styles.rowItem}>
              <Text style={styles.value}>
                {pesanan.nama} ({pesanan.berat}kg)
              </Text>
              <Text style={styles.value}>{formatRupiah(pesanan.harga)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.label}>Total Berat</Text>
          <Text style={styles.total}>{item.berat}kg</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.label}>Total Harga</Text>
          <Text style={[styles.total, {color: '#4CAF50'}]}>
            {formatRupiah(parseFloat(item.total))}
          </Text>
        </View>
      </View>
    );
  };

  // Render item untuk transaksi tarik saldo
  const renderTarikItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.tanggal}>
          {moment(item.tanggal).format('DD MMMM YYYY')} - {item.jam}
        </Text>

        <View style={styles.rowGroup}>
          <View style={styles.rowItem}>
            <Text style={styles.item}>Kode Transaksi</Text>
            <Text style={styles.value}>{item.kode}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.item}>Status</Text>
            <Text
              style={[
                styles.value,
                {
                  color:
                    item.status_tukar === 'Berhasil' ? '#4CAF50' : '#FF9800',
                },
              ]}>
              {item.status_tukar}
            </Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.label}>Jumlah Tarik</Text>
          <Text style={[styles.total, {color: '#F44336'}]}>
            {formatRupiah(parseFloat(item.tukar))}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.label}>Saldo Akhir</Text>
          <Text style={styles.total}>
            {formatRupiah(parseFloat(item.akhir))}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyHeader title="Riwayat Transaksi" />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'setor' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('setor')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'setor' && styles.activeTabText,
            ]}>
            Jual Sampah
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'tarik' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('tarik')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'tarik' && styles.activeTabText,
            ]}>
            Tarik Saldo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {activeTab === 'setor' ? (
          <FlatList
            data={data.setor}
            renderItem={renderSetorItem}
            keyExtractor={(item, index) => `setor-${index}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Belum ada transaksi jual sampah
                </Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={data.tarik}
            renderItem={renderTarikItem}
            keyExtractor={(item, index) => `tarik-${index}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Belum ada transaksi tarik saldo
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: colors.secondary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: '#666',
  },
  activeTabText: {
    color: colors.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    margin: 20,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tanggal: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
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
    marginBottom: 5,
  },
  item: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.secondary[800],
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.primary[400],
    textAlign: 'right',
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: fonts.primary[400],
  },
});
