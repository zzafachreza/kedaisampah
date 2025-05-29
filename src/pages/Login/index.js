import React, { useState } from 'react';
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
} from 'react-native';
import { colors, fonts } from '../../utils';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Kata Sandi"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20 }}>
          <Text style={styles.forgot}>Forget password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Belum memiliki akun? Silakan </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Daftar</Text>
          </TouchableOpacity>
        </View>
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
    alignItems:"center",
    alignSelf:"center"
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
   borderWidth:1,
   borderColor:'#dedede',
   color:colors.black,
   fontFamily:fonts.primary[400],
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
