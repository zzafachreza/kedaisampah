import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MyHeader } from '../../components';
import { windowWidth, fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { Alert } from 'react-native';
import { MYAPP, storeData, webURL } from '../../utils/localStorage';
// import { getData, storeData, MYAPP } from '../../utils/localStorage'; // ← backend utils
import { getData } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';


export default function Profile({ navigation }) {
  // Data dummy sementara


  const [user, setUser] = useState({
    foto_pengguna: ''
  });
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData('user').then(res => {
        setUser(res);
      })
    }
  }, [isFocus])

  const handleLogout = () => {
    Alert.alert(MYAPP, 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        onPress: () => {
          storeData('user', null);
          navigation.replace('Splash');
        },
      },
    ]);
  };



  return (
    <SafeAreaView style={styles.container}>
      <MyHeader title="Profil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.content}>
          <Image source={{
            uri: user.foto_pengguna.length > 0 ? webURL + user.foto_pengguna : 'https://zavalabs.com/noimage.png'
          }} style={styles.avatar} />
          <Text style={styles.kode}>{user.kode}</Text>

          <View style={styles.box}>
            <Text style={styles.label}>Nama Lengkap :</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{user.nama_lengkap}</Text>
            </View>

            <Text style={styles.label}>Username :</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{user.username}</Text>
            </View>

            <Text style={styles.label}>Nomor Telepon :</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{user.telepon}</Text>
            </View>

            <Text style={styles.label}>Alamat :</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{user.alamat}</Text>
            </View>



            <TouchableOpacity onPress={() => navigation.navigate('AccountEdit', user)} style={styles.buttonEdit}>
              <Text style={styles.buttonEditText}>Edit Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
              <Text style={styles.buttonLogoutText}>Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 4,
  },
  kode: {
    fontFamily: fonts.primary[400],
    color: '#999',
    fontSize: 16,
    marginBottom: 20,
  },
  box: {
    width: '100%',
  },
  label: {
    fontFamily: fonts.primary[600],
    color: colors.secondary,
    marginBottom: 4,
  },
  inputBox: {
    backgroundColor: '#F2FFF6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  inputText: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.black,
  },
  buttonEdit: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonEditText: {
    fontFamily: fonts.primary[700],
    color: colors.white,
    fontSize: 16,
  },
  buttonLogout: {
    backgroundColor: '#999',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonLogoutText: {
    fontFamily: fonts.primary[700],
    color: colors.white,
    fontSize: 16,
  },
});
