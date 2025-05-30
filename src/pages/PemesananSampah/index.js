import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

const dataSampahAwal = [
  {
    id: 1,
    nama: 'Botol Plastik',
    deskripsi: 'Botol Le Mineral, Botol Aqua, Botol Club, Botol Pulpy dan sejenisnya.',
    hargaPerKg: 5000,
    image: require('../../assets/botol_plastik.png'),
  },
  {
    id: 2,
    nama: 'Kertas',
    deskripsi: 'Semua jenis kertas',
    hargaPerKg: 5000,
    image: require('../../assets/kertas.png'),
  },
  {
    id: 3,
    nama: 'Kardus',
    deskripsi: 'Semua jenis kardus',
    hargaPerKg: 5000,
    image: require('../../assets/kardus.png'),
  },
  {
    id: 4,
    nama: 'Botol Kaca',
    deskripsi: 'Botol You C1000, Botol Kecap, Botol Teh Botol, dan sejenisnya',
    hargaPerKg: 5000,
    image: require('../../assets/botol_kaca.png'),
  },
];

export default function PemesananSampah({ navigation }) {
  const [dataSampah, setDataSampah] = useState([]);

  const [user, setUser] = useState({})
  const [comp, setComp] = useState({});
  const __getCompany = () => {
    axios.post(apiURL + 'company').then(res => {
      console.log(res.data)
      setComp(res.data[0]);
    })
  }

  const _getSampah = () => {
    axios.post(apiURL + 'sampah').then(res => {
      console.log(res.data)
      setDataSampah(res.data);
    })
  }

  const handleInput = (id, value) => {
    setDataSampah(prev =>
      prev.map(item => {
        if (item.id_barang === id) {
          return {
            ...item,
            berat: value,
          };
        }
        return item;
      })
    );
  };

  const handleInputBlur = (id) => {
    setDataSampah(prev =>
      prev.map(item => {
        if (item.id_barang === id) {
          // hanya ubah jadi tombol + kalau beratnya kosong
          if (item.berat.trim() === '') {
            return {
              ...item,
              showInput: false,
              berat: '',
            };
          }
        }
        return item;
      })
    );
  };


  const toggleInput = (id) => {
    const updated = dataSampah.map(item => {
      if (item.id_barang === id) {
        return { ...item, showInput: true };
      }
      return item;
    });
    setDataSampah(updated);
  };

  const getSummary = () => {
    const filtered = dataSampah.filter(i => i.berat !== '' && parseFloat(i.berat) > 0);
    const totalJenis = filtered.length;
    const totalKg = filtered.reduce((sum, i) => sum + parseFloat(i.berat), 0);
    const totalHarga = filtered.reduce((sum, i) => sum + parseFloat(i.berat) * i.harga, 0);
    return { filtered, totalJenis, totalKg, totalHarga };
  };

  const { filtered, totalJenis, totalKg, totalHarga } = getSummary();


  const handleCheckout = () => {
    const listSampah = dataSampah.filter(item => item.berat && parseFloat(item.berat) > 0);

    if (listSampah.length === 0) {
      Alert.alert('Oops', 'Silakan isi minimal satu jenis sampah');
      return;
    }

    const nomor = comp.tlp; // Nomor WhatsApp tujuan
    let header = `Nomor Telepon : *${user.telepon}*\n`;
    header += `Nama Pengguna : *${user.nama_lengkap}*\n\nList Sampah :\n`;
    const isi = listSampah
      .map((item, index) => `${index + 1}. *${item.nama}* *${item.berat} kg* = *${formatRupiah(parseFloat(item.berat) * parseFloat(item.harga))}*`)
      .join('\n');

    const message = header + isi;
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(message)}`;

    console.log(listSampah);
    axios.post(apiURL + 'insert_setor', {
      user: user,
      sampah: listSampah
    }).then(res => {
      console.log(res.data);
      navigation.goBack();
      if (res.data.status == 200) {
        showMessage({
          type: 'success',
          message: res.data.message
        })
        Linking.openURL(url).catch(() =>
          Alert.alert('Error', 'Tidak dapat membuka WhatsApp')
        );
      }

    })

  };



  useEffect(() => {
    getData('user').then(res => {
      setUser(res)
    })
    __getCompany();
    _getSampah();
  }, [])

  function formatRupiah(value, pakai = true) {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return pakai ? `Rp${formatted}` : formatted;
  }


  return (
    <View style={styles.container}>
      <MyHeader title="Pemesanan Sampah" />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {dataSampah.map((item, index) => (
          <View key={item.id} style={[styles.card, index !== 0 && styles.cardBorder]}>
            <View style={styles.row}>
              <Image source={{
                uri: webURL + item.foto_barang
              }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.nama}>{item.nama}</Text>
                <Text style={styles.deskripsi}>{item.keterangan}</Text>
                <View style={styles.hargaRow}>
                  <Image source={require('../../assets/coin.png')} style={styles.coin} />
                  <Text style={styles.harga}>{formatRupiah(item.harga)}/kg</Text>
                </View>
              </View>
              {item.showInput ? (
                <View style={styles.inputWrapper}>
                  <TextInput
                    keyboardType="numeric"
                    value={item.berat}
                    onChangeText={value => handleInput(item.id_barang, value)}
                    onBlur={() => handleInputBlur(item.id_barang)}
                    style={styles.input}
                    placeholder="0"
                  />

                  <Text style={styles.kg}>kg</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.tombol} onPress={() => toggleInput(item.id_barang)}>
                  <Text style={styles.tombolText}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {filtered.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>
              {totalJenis} Jenis   |   {totalKg} Kg
            </Text>
            {filtered.map((item, index) => (
              <View key={index} style={styles.summaryItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.nama}>{item.nama}</Text>
                <Text style={styles.kgInfo}>{item.berat} Kg</Text>
                <Text style={styles.hargaInfo}>{formatRupiah(item.harga * parseFloat(item.berat))}</Text>
              </View>
            ))}
            <Text style={styles.totalBiaya}>Total Biaya : {formatRupiah(totalHarga)}</Text>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardBorder: {
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  nama: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: fonts.primary[700],
    marginBottom: 2,
  },
  deskripsi: {
    fontSize: 13,
    color: '#999',
    fontFamily: fonts.primary[400],
    marginBottom: 6,
  },
  hargaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  harga: {
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.primary[600],
  },
  tombol: {
    backgroundColor: colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tombolText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
    marginTop: 4,
  },
  input: {
    width: 40,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    padding: 0,
    textAlign: 'center',
    color: colors.black,
  },
  kg: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    marginLeft: 4,
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  summaryTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    marginRight: 6,
    fontSize: 16,
    color: '#000',
  },
  kgInfo: {
    marginLeft: 'auto',
    marginRight: 10,
    fontFamily: fonts.primary[400],
  },
  hargaInfo: {
    fontFamily: fonts.primary[600],
  },
  totalBiaya: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: colors.secondary,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.primary[700],
  },
});
