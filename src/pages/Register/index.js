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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <View style={styles.container}>
    <MyHeader/>
    <ScrollView>
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
          <TextInput
            placeholder="Isi Kata Sandi"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Konfirmasi Kata Sandi :</Text>
          <TextInput
            placeholder="Isi Konfirmasi Kata Sandi"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={konfirmasi}
            onChangeText={setKonfirmasi}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0B9444" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>
        )}

        <View style={styles.loginPrompt}>
          <Text style={{ color: '#888' }}>Sudah memiliki akun? Silakan </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#0B9444', fontWeight: 'bold' }}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
   
  );
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    alignItems:"center",
    backgroundColor:colors.primary
  
  },
  logo: {
    width: 283,
    height: 163,
    marginBottom: 10,
    marginTop:0,
    alignSelf:"center"
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
    fontFamily:fonts.primary[400],

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
    marginTop: 10,
    textAlign:"center",
    alignItems:"center",
    alignSelf:"center",
    justifyContent:'center'
  },
});
