import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';
const { width } = Dimensions.get('window');

export default function Register({ navigation }) {
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasi, setKonfirmasi] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = () => {
    // setLoading(true);
    const kirim = {
      nama_lengkap: nama,
      username: username,
      telepon: telepon,
      alamat: alamat,
      password: password
    }

    console.log(kirim);
    axios.post(apiURL + 'register', kirim).then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        showMessage({
          type: 'success',
          message: res.data.message
        });
        navigation.navigate('Login');
      } else {
        showMessage({
          type: 'danger',
          message: res.data.message
        })
      }
    })
    // setTimeout(() => {
    //   setLoading(false);
    //   navigation.navigate('Login');
    // }, 1500);
  };

  const [buka, setBuka] = useState(false);
  const [buka2, setBuka2] = useState(false);
  return (
    <View style={styles.container}>
      <MyHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View >
          <Image
            source={require('../../assets/logologin.png')} // pastikan sesuai
            style={styles.logo}

          />

          <View style={styles.form}>
            <Text style={styles.label}>Nama Lengkap :</Text>
            <TextInput
              placeholder="Isi Nama Lengkap"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={nama}
              onChangeText={setNama}
            />

            <Text style={styles.label}>Username :</Text>
            <TextInput
              placeholder="Isi Username"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Nomor Telepon :</Text>
            <TextInput
              placeholder="Isi Nomor Telepon"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="phone-pad"
              value={telepon}
              onChangeText={setTelepon}
            />


            <Text style={styles.label}>Alamat :</Text>
            <TextInput
              placeholder="Isi Alamat"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={alamat}
              onChangeText={setAlamat}
            />

            <Text style={styles.label}>Kata Sandi :</Text>


            <View style={{
              position: 'relative'
            }}>
              <TextInput
                placeholder="Kata Sandi"
                placeholderTextColor="#bbb"
                secureTextEntry={!buka ? true : false}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setBuka(!buka)} style={{
                position: 'absolute',
                right: 10,
                top: 12,
              }}>
                <Icon type='ionicon' name={buka ? 'eye' : 'eye-off'} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Konfirmasi Kata Sandi :</Text>

            <View style={{
              position: 'relative'
            }}>
              <TextInput
                placeholder="Kata Sandi"
                placeholderTextColor="#bbb"
                secureTextEntry={!buka2 ? true : false}
                value={konfirmasi}
                onChangeText={setKonfirmasi}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setBuka2(!buka2)} style={{
                position: 'absolute',
                right: 10,
                top: 12,
              }}>
                <Icon type='ionicon' name={buka2 ? 'eye' : 'eye-off'} />
              </TouchableOpacity>
            </View>


          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0B9444" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onRegister}>
              <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.loginPrompt}>
              <Text style={{ color: '#888' }}>Sudah memiliki akun? Silakan </Text>
              <Text style={{ color: '#0B9444', fontWeight: 'bold' }}>Masuk</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary

  },
  logo: {
    width: 283,
    height: 163,
    marginBottom: 10,
    marginTop: 0,
    alignSelf: "center"
  },
  title: {
    color: '#1A8731',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#1A8731',
    fontSize: 14,
    marginBottom: 30,
  },
  form: {

  },
  label: {
    fontSize: 14,
    color: '#0B9444',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F2FFF6',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dedede',
    color: '#000',
    fontFamily: fonts.primary[400],

  },
  button: {
    backgroundColor: '#0B9444',
    width: width * 0.85,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {

    flexDirection: 'row',
    marginVertical: 20,
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center'
  },
});
