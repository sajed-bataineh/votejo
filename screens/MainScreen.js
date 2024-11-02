import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function MainScreen({ navigation }) {
    const [idNumber, setIdNumber] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const rotateAnimation = new Animated.Value(0);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme !== null) {
                setIsDarkTheme(savedTheme === 'dark');
            }
        };
        loadTheme();

        Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const toggleLanguage = async () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLanguage);
        await AsyncStorage.setItem('language', newLanguage);
    };

    const rotateY = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
            {/* Language and Theme Toggle Section */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
                    <Text style={{ color: isDarkTheme ? '#fff' : '#333' }}>
                        {i18n.language === 'en' ? 'EN' : 'AR'}
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.switchLabel, { color: isDarkTheme ? '#fff' : '#333' }]}>الوضع المعتم</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    thumbColor={isDarkTheme ? '#fff' : '#333'}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>

            {/* Logo Animation */}
            <Animated.Image
                source={require('../assets/images/logo.png')}
                style={[
                    styles.logo,
                    {
                        transform: [
                            { perspective: 1000 },
                            { rotateY: rotateY },
                        ],
                    },
                ]}
            />

            {/* Content Card */}
            <View style={[styles.card, { backgroundColor: isDarkTheme ? '#444' : '#fff' }]}>
                <Text style={[styles.subtitle, { color: isDarkTheme ? '#ddd' : '#333' }]}>
                    {t('welcomeMessage')}
                </Text>
                <Image source={require('../assets/images/user-icon.png')} style={styles.icon} />
                <Text style={[styles.label, { color: isDarkTheme ? '#ddd' : '#333' }]}>{t('nationalID')}</Text>
                <TextInput
                    style={[styles.input, { borderColor: isDarkTheme ? '#888' : '#29B373', color: isDarkTheme ? '#ddd' : '#333' }]}
                    placeholder={t('enterID')}
                    placeholderTextColor={isDarkTheme ? '#aaa' : '#555'}
                    keyboardType="numeric"
                    value={idNumber}
                    onChangeText={setIdNumber}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : '#29B373' }]}
                    onPress={() => navigation.navigate("FaceVerification", { isDarkTheme, toggleTheme })}
                >
                    <Text style={styles.buttonText}>{t('submit')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        left: 20, // نقل الزر إلى اليسار
    },
    languageButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        width: 40,
        alignItems: 'center',
    },
    switchLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
