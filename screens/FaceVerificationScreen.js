import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FaceVerificationScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        setVerificationStatus(t('verificationPrompt'));
    }, [t]);

    const handleVerificationSuccess = () => {
        if (!isVerifying) {
            setIsVerifying(true);
            setVerificationStatus(t('verificationSuccess'));
            setTimeout(() => {
                navigation.navigate("VoterDrawer", {
                    screen: "VoterDetails",
                    params: {
                        voter: {
                            username_ar: "فاطمة محمد علي",
                            id_number: "11223",
                            age: 22,
                            address: "عمان"
                        }
                    }
                });
            }, 2000);
        }
    };

    const toggleLanguage = async () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLanguage);
        await AsyncStorage.setItem('language', newLanguage);
    };

    if (hasPermission === null) {
        return <View><Text>{t('cameraPermissionRequest')}</Text></View>;
    }
    if (hasPermission === false) {
        return <Text>{t('cameraPermissionDenied')}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
                    <Text style={{ color: '#333' }}>
                        {i18n.language === 'en' ? 'EN' : 'AR'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.verificationText}>{verificationStatus}</Text>
            {Camera && Camera.Constants ? (
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.front}
                />
            ) : (
                <Text>{t('cameraSetupError')}</Text>
            )}
            <TouchableOpacity 
                style={[styles.button, isVerifying && { backgroundColor: '#ccc' }]}
                onPress={handleVerificationSuccess}
                disabled={isVerifying}
            >
                <Text style={styles.buttonText}>{t('verifyButton')}</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                {t('securityNote')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    toggleContainer: {
        position: 'absolute',
        top: 10, // تعديل المسافة العلوية للزر
        right: 20,
        flexDirection: 'row',
    },
    languageButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 40,
        alignItems: 'center',
    },
    verificationText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 60, // زيادة المسافة تحت الزر
        marginBottom: 20, // مسافة أكبر للنصوص
    },
    camera: {
        width: '90%',
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    button: {
        marginTop: 30, // زيادة المسافة بين الكاميرا وزر التحقق
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#29B373',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    footerText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 30, // مسافة أكبر للنص النهائي
        paddingHorizontal: 30,
    },
});
