import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert
} from 'react-native';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';

const { width } = Dimensions.get('window');

export default function Penukaran({ navigation }) {
  const [namaLengkap, setNamaLengkap] = useState('Riri Indriyani');
//   const [jumlahSampah, setJumlahSampah] = useState('10 Kg');
  const [jumlahSaldo, setJumlahSaldo] = useState('Rp100.000');
  const [inputSaldo, setInputSaldo] = useState('');

  // Fungsi ubah ke format "Rp10.000"
  const formatRupiah = (value) => {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    return 'Rp' + rupiah;
  };

  // Fungsi ambil angka mentah dari input
  const getCleanNumber = (formatted) => {
    return formatted.replace(/[^\d]/g, '');
  };
const handleSimpan = () => {
  const cleanJumlahSaldo = getCleanNumber(jumlahSaldo || '0');
  const cleanInputSaldo = getCleanNumber(inputSaldo || '0');

  if (parseInt(cleanInputSaldo) > parseInt(cleanJumlahSaldo)) {
    Alert.alert('Gagal', 'Saldo yang ditukar melebihi saldo tersedia.');
    return;
  }

  const pesan =
    `Nama Lengkap : *${namaLengkap}*\n` +
    `Jumlah Saldo : *Rp${parseInt(cleanJumlahSaldo).toLocaleString('id-ID')}*\n` +
    `Jumlah saldo yg akan ditukar : *Rp${parseInt(cleanInputSaldo).toLocaleString('id-ID')}*`;

  const url = `https://wa.me/6285795433065?text=${encodeURIComponent(pesan)}`;

  Linking.openURL(url).catch(() =>
    Alert.alert('Error', 'Tidak dapat membuka WhatsApp')
  );
};

  return (
    <View style={styles.container}>
      <MyHeader title="Request Penukaran" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.formGroup}>
          {/* Nama Lengkap */}
          <Text style={styles.label}>Nama Lengkap :</Text>
          <TextInput
            style={styles.input}
            value={namaLengkap}
            editable={false}
          />

        

          {/* Jumlah Saldo */}
          <Text style={styles.label}>Jumlah Saldo :</Text>
          <TextInput
            style={styles.input}
            value={jumlahSaldo}
            keyboardType="numeric"
          />

          {/* Input Saldo yang Akan Ditukar */}
          <Text style={styles.label}>Input Saldo yang akan ditukar :</Text>
          <TextInput
            placeholder="Isi saldo yang akan ditukar"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="numeric"
            value={inputSaldo}
            onChangeText={(value) => {
              const clean = value.replace(/[^\d]/g, '');
              const formatted = formatRupiah(clean);
              setInputSaldo(formatted);
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
    borderColor: '#dededede'
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
