// screens/SupportScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function SupportScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* شعار التطبيق */}
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />

            <Text style={styles.headerText}>التواصل مع الدعم الفني</Text>

            {/* صندوق معلومات الدعم 1 */}
            <View style={styles.infoBox}>
                <Image source={require('../assets/images/men.png')} style={styles.icon} />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>الاسم:  عبد الكريم الزعبي  </Text>
                    <Text style={styles.infoText}>رقم الهاتف:0791473676</Text>
                    <Text style={styles.infoText}>البريد الإلكتروني: support1@company.com</Text>
                </View>
            </View>

            {/* صندوق معلومات الدعم 2 */}
            <View style={styles.infoBox}>
                <Image source={require('../assets/images/men.png')} style={styles.icon} />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>الاسم: فريق الدعم 2</Text>
                    <Text style={styles.infoText}>رقم الهاتف: +962 7XX XXX XXX</Text>
                    <Text style={styles.infoText}>البريد الإلكتروني: support2@company.com</Text>
                </View>
            </View>

            {/* صندوق معلومات الدعم 3 */}
            <View style={styles.infoBox}>
                <Image source={require('../assets/images/men.png')} style={styles.icon} />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>الاسم: فريق الدعم 3</Text>
                    <Text style={styles.infoText}>رقم الهاتف: +962 7XX XXX XXX</Text>
                    <Text style={styles.infoText}>البريد الإلكتروني: support3@company.com</Text>
                </View>
            </View>

            {/* صندوق معلومات الدعم 4 */}
            <View style={styles.infoBox}>
                <Image source={require('../assets/images/men.png')} style={styles.icon} />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>الاسم: فريق الدعم 4</Text>
                    <Text style={styles.infoText}>رقم الهاتف: +962 7XX XXX XXX</Text>
                    <Text style={styles.infoText}>البريد الإلكتروني: support4@company.com</Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    infoBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    icon: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});
