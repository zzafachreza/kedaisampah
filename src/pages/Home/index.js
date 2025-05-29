import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>

        {/* Header Hijau */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Selamat Datang</Text>
            <Text style={styles.nama}>Riri Indriyani</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("JumlahSampah")} style={styles.bookmarkIcon}>
            <Icon type="ionicon" name="reader-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Gambar Sampah */}
        <Image
          source={require('../../assets/sampah_utama.png')}
          style={styles.gambarSampah}
          resizeMode="cover"
        />

        {/* Card Informasi */}
        <View style={styles.cardRow}>
          <View style={[styles.card, { backgroundColor: '#FAFF89' }]}>
            <Image source={require('../../assets/icon_timbangan.png')} style={styles.cardImage} />
            <View style={styles.cardFooter}>
              <Text style={styles.cardValue}>67kg</Text>
              <Text style={styles.cardLabel}>Jumlah Sampah</Text>
            </View>
          </View>
          <View style={[styles.card, { backgroundColor: '#87FBB9' }]}>
            <Image source={require('../../assets/icon_uang.png')} style={styles.cardImage} />
            <View style={styles.cardFooter}>
              <Text style={styles.cardValue}>Rp100.000</Text>
              <Text style={styles.cardLabel}>Jumlah Saldo</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/home_icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Penukaran")} style={styles.navItem}>
          <Image source={require('../../assets/transaction_icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PemesananSampah")} style={styles.navItem}>
          <Image source={require('../../assets/cart_icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/profile_icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0B9444',
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 16,
    color: 'white',
  },
  nama: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  bookmarkIcon: {
    padding: 6,
  },
  gambarSampah: {
    width: width - 40,
    height: 170,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  card: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 90,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 8,
  },
  cardFooter: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'flex-start',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B9444',
  },
  cardLabel: {
    fontSize: 13,
    color: '#444',
  },
  bottomNav: {
    backgroundColor: '#0B9444',
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },
});
