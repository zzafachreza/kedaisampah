import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar, webURL } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            // setLoading(false);
            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                storeData('user', res.data.data);

                navigation.replace('Home');
            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_pengguna: null
        })
    }, [])

    const pilihFoto = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true }, res => {

            if (!res.didCancel) {
                console.log(res)
                setKirim({
                    ...kirim,
                    newfoto_pengguna: `data:${res.type};base64,${res.base64}`
                });
            }
        });
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 20,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <TouchableOpacity onPress={pilihFoto} style={{
                    backgroundColor: colors.border,
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.secondary,
                    overflow: 'hidden',
                    alignSelf: 'center',
                }}>
                    <Image source={{ uri: kirim.newfoto_pengguna !== null ? kirim.newfoto_pengguna : webURL + kirim.foto_pengguna }} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                    }} />
                </TouchableOpacity>

                <MyInput label="Username" iconname="at" value={kirim.username} onChangeText={x => setKirim({ ...kirim, username: x })} />
                <MyGap jarak={10} />

                <MyInput label="Nama Lengkap" iconname="person" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={10} />


                <MyInput label="Telepon" iconname="call" keyboardType="phone-pad" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={10} />

                <MyInput label="Alamat" iconname="location" value={kirim.alamat} onChangeText={x => setKirim({ ...kirim, alamat: x })} />
                <MyGap jarak={10} />

                <MyGap jarak={10} />

                <MyInput label="Password" iconname="key" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.secondary} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})