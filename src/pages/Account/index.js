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
// import { getData, storeData, MYAPP } from '../../utils/localStorage'; // ← backend utils

export default function Profile({ navigation }) {
  // Data dummy sementara
  const dummyUser = {
    kode: 'KS001',
    nama_lengkap: 'Riri Indriyani',
    username: 'ririndri',
    telepon: '0897567664675',
    alamat: 'Jl. Banda No. 30 Kota Bandung',
    password: '******',
    foto: require('../../assets/user_dummy.png'),
  };

  const [user, setUser] = useState(dummyUser);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getData('user').then(res => {
  //     setUser(res);
  //     setLoading(false);
  //   });
  // }, []);

  const handleLogout = () => {
    // Alert.alert(MYAPP, 'Yakin ingin keluar?', [
    //   { text: 'Batal', style: 'cancel' },
    //   {
    //     text: 'Keluar',
    //     onPress: () => {
    //       storeData('user', null);
    //       navigation.replace('Login');
    //     },
    //   },
    // ]);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader title="Profil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.content}>
          <Image source={user.foto} style={styles.avatar} />
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

            <Text style={styles.label}>Kata Sandi :</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{user.password}</Text>
            </View>

            <TouchableOpacity style={styles.buttonEdit}>
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
    width: 100,
    height: 100,
    borderRadius: 100,
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
