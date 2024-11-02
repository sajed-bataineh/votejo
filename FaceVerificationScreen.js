import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function FaceVerificationScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState("للتأكد من هويتك، يُرجى تحريك رأسك إلى الجهة اليمنى أو اليسرى أمام الكاميرا.");

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleVerificationSuccess = () => {
        setVerificationStatus("تم التحقق بنجاح!");
        setTimeout(() => {
            navigation.navigate("SuccessScreen"); // انتقل للصفحة التالية بعد التحقق
        }, 2000);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>تم رفض الإذن للوصول إلى الكاميرا</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>VOTE JO</Text>
            </View>
            <Text style={styles.verificationText}>{verificationStatus}</Text>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front}
                ref={(ref) => setCameraRef(ref)}
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={handleVerificationSuccess}
            >
                <Text style={styles.buttonText}>تم التحقق</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                نهدف من هذا الإجراء إلى تعزيز الأمان والتأكد من مطابقة الصورة مع هويتك. شكراً لتفهمك!
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    verificationText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    },
    camera: {
        width: '90%',
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    button: {
        marginTop: 20,
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
        marginVertical: 20,
        paddingHorizontal: 30,
    },
});
