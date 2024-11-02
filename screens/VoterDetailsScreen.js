import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

export default function VoterDetailsScreen({ route, navigation }) {
    const { voter, toggleTheme, isDarkTheme } = route.params;
    const borderColorAnimation = useRef(new Animated.Value(0)).current;
    const { t, i18n } = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                        <Icon name={isDarkTheme ? 'sun-o' : 'moon-o'} size={24} color={isDarkTheme ? '#fff' : '#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
                        <Text style={{ color: isDarkTheme ? '#fff' : '#333' }}>
                            {i18n.language === 'en' ? 'EN' : 'AR'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [isDarkTheme, i18n.language]);

    const toggleLanguage = async () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(borderColorAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(borderColorAnimation, {
                    toValue: 2,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(borderColorAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [borderColorAnimation]);

    const borderColor = borderColorAnimation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['red', 'white', 'green'],
    });

    const backgroundColor = isDarkTheme ? '#333' : '#fff';
    const textColor = isDarkTheme ? '#fff' : '#333';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.content}>
                <View style={styles.profileContainer}>
                    <Animated.View style={[styles.profileBorder, { borderColor }]}>
                        <Image source={require('../assets/images/user-icon.png')} style={styles.profileImage} />
                    </Animated.View>
                    <View style={styles.info}>
                        <Text style={[styles.text, { color: textColor }]}>{t('name')}: <Text style={styles.value}>{voter.username_ar}</Text></Text>
                        <Text style={[styles.text, { color: textColor }]}>{t('nationalID')}: <Text style={styles.value}>{voter.id_number}</Text></Text>
                        <Text style={[styles.text, { color: textColor }]}>{t('age')}: <Text style={styles.value}>{voter.age}</Text></Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.locationButton}>
                    <Text style={styles.buttonText}>{t('district')}: عمان</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.voteButton} 
                  onPress={() => navigation.navigate('Vot', { isDarkTheme, toggleTheme })}
                >
                  <Text style={styles.buttonText}>{t('startVoting')}</Text>
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
        paddingHorizontal: 20,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    themeButton: {
        padding: 10,
    },
    languageButton: {
        padding: 10,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileBorder: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    info: {
        marginTop: 15,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    value: {
        color: '#555',
    },
    locationButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    voteButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
