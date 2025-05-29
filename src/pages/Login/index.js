import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import { colors, fonts } from '../../utils';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { apiURL, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';
const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [comp, setComp] = useState({});
  const [kirim, setKirim] = useState({
    username: '',
    password: ''
  });

  const loginMasuk = () => {
    if (kirim.username.length == 0 || kirim.password.length == 0) {
      showMessage({ message: 'Username dan password wajib diisi !' })
    } else {
      axios.post(apiURL + 'login', kirim).then(res => {
        if (res.data.status == 200) {
          storeData('user', res.data.data);
          navigation.replace('Home')
        } else {
          showMessage({
            type: 'danger',
            message: res.data.message
          })
        }
      });
    }
  }

  useEffect(() => {
    axios.post(apiURL + 'company').then(res => {
      console.log(res.data);
      setComp(res.data[0]);
    })
  }, []);

  const [buka, setBuka] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Image
          source={require('../../assets/logologin.png')} // pastikan file ini ada
          style={styles.logo}
          resizeMode="contain"
        />



        <TextInput
          placeholder="Username"
          placeholderTextColor="#bbb"
          value={kirim.username}
          onChangeText={x => setKirim({
            ...kirim,
            username: x
          })}
          style={styles.input}
        />

        <View style={{
          position: 'relative'
        }}>
          <TextInput
            placeholder="Kata Sandi"
            placeholderTextColor="#bbb"
            secureTextEntry={!buka ? true : false}
            value={kirim.password}
            onChangeText={x => setKirim({
              ...kirim,
              password: x
            })}
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

        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${comp.tlp}?text=Halo Admin, saya lupa password . . .`)} style={{ alignSelf: 'flex-end', marginRight: 20 }}>
          <Text style={styles.forgot}>Lupa password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={loginMasuk} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum memiliki akun? Silakan </Text>

            <Text style={styles.registerLink}>Daftar</Text>

          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  logo: {
    width: 283,
    height: 163,
    marginBottom: 133,
    alignItems: "center",
    alignSelf: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A8731',
  },
  subtitle: {
    fontSize: 14,
    color: '#1A8731',
    marginBottom: 40,
  },
  input: {
    width: width * 0.85,
    backgroundColor: '#F2FFF6',
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 20,
    fontSize: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dedede',
    color: colors.black,
    fontFamily: fonts.primary[400],
  },
  forgot: {
    fontSize: 14,
    color: '#1A8731',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#0B9444',
    width: width * 0.85,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#999',
    fontSize: 14,
  },
  registerLink: {
    color: '#1A8731',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
