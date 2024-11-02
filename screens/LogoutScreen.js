// screens/LogoutScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogoutScreen() {
    const navigation = useNavigation();

    const handleLogout = () => {
        // إعادة تعيين التنقل والانتقال إلى الشاشة الرئيسية
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.text}>تسجيل الخروج</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
