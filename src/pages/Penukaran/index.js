import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import {MyHeader} from '../../components';
import {colors, fonts} from '../../utils';
import axios from 'axios';
import {apiURL} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

const {width} = Dimensions.get('window');

export default function Penukaran({navigation, route}) {
  const user = route.params.user;
  const saya = route.params.saya;

  const [tukar, setTukar] = useState(0);
  // Fungsi ubah ke format "Rp10.000"

  const [comp, setComp] = useState({});
  const __getCompany = () => {
    axios.post(apiURL + 'company').then(res => {
      console.log(res.data);
      setComp(res.data[0]);
    });
  };

  // Fungsi ambil angka mentah dari input
  const getCleanNumber = formatted => {
    return formatted.replace(/[^\d]/g, '');
  };

  function formatRupiah(value, pakai = true) {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return pakai ? `Rp${formatted}` : formatted;
  }

  const handleSimpan = () => {
    if (parseInt(tukar) > parseInt(saya.saldo)) {
      Alert.alert('Gagal', 'Saldo yang ditukar melebihi saldo tersedia.');
      return;
    } else if (parseInt(tukar) < 10000) {
      Alert.alert('Gagal', 'Saldo yang ditukar minimal Rp10.000');
      return;
    }

    const pesan =
      `Nama Lengkap : *${user.nama_lengkap.trim()}*\n` +
      `Jumlah Saldo : *${formatRupiah(parseFloat(saya.saldo))}*\n` +
      `Jumlah saldo yg akan ditukar : *${formatRupiah(parseFloat(tukar))}*`;

    const url = `https://wa.me/${comp.tlp}?text=${encodeURIComponent(pesan)}`;

    axios
      .post(apiURL + 'insert_tukar', {
        fid_pengguna: user.id_pengguna,
        saldo: saya.saldo,
        tukar: tukar,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          showMessage({
            type: 'success',
            message: res.data.message,
          });
          navigation.goBack();
          Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'Tidak dapat membuka WhatsApp'),
          );
        }
      });
  };

  useEffect(() => {
    __getCompany();
  }, []);

  return (
    <View style={styles.container}>
      <MyHeader title="Request Penukaran" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.formGroup}>
          {/* Nama Lengkap */}
          <Text style={styles.label}>Nama Lengkap :</Text>
          <TextInput
            style={styles.input}
            value={user.nama_lengkap}
            editable={false}
          />

          {/* Jumlah Saldo */}
          <Text style={styles.label}>Jumlah Saldo :</Text>
          <TextInput
            style={styles.input}
            value={new Intl.NumberFormat().format(saya.saldo)}
            editable={false}
          />

          {/* Input Saldo yang Akan Ditukar */}
          <Text style={styles.label}>Input Saldo yang akan ditukar :</Text>
          <TextInput
            placeholder="Isi saldo yang akan ditukar"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="numeric"
            value={tukar}
            onChangeText={value => {
              // const clean = value.replace(/[^\d]/g, '');
              // const formatted = formatRupiah(clean);
              setTukar(value);
            }}
          />
        </View>

        {/* Tombol Simpan */}
        <TouchableOpacity onPress={handleSimpan} style={styles.button}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  formGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.primary[600],
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F2FFF6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.primary[400],
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dededede',
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.primary[600],
  },
});
