import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VotingScreen() {
    const [timeRemaining, setTimeRemaining] = useState(90);
    const [checkedItems, setCheckedItems] = useState([false, false, false]);
    const navigation = useNavigation();

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdown);
                    navigation.navigate('Endvote'); // Redirects automatically when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [navigation]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const toggleCheckBox = (index) => {
        if (timeRemaining === 0) {
            Alert.alert("انتهى الوقت", "لم يعد بإمكانك تعديل التصويت بعد انتهاء الوقت.");
            return;
        }
        const updatedCheckedItems = checkedItems.map((item, i) => i === index ? !checkedItems[index] : false);
        setCheckedItems(updatedCheckedItems);
    };

    const navigateToEndvoteScreen = () => {
        navigation.navigate('Endvote'); // Directs to Endvote screen on button press
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
            </View>
            <View style={styles.timerDiv}>
                <Text style={styles.timerLabel}>الوقت المتبقي</Text>
                <Text style={[styles.timer, { color: timeRemaining <= 30 ? 'red' : '#333' }]}>
                    {timeRemaining > 0 ? formatTime(timeRemaining) : "انتهى الوقت"}
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.lists}>
                {[1, 2, 3].map((item, index) => (
                    <View key={index} style={styles.list}>
                        <View style={styles.data}>
                            <View style={styles.img}>
                                <Image source={require('../assets/images/men.png')} style={styles.personImage} />
                            </View>
                            <View style={styles.name}>
                                <Text style={styles.partyName}>اسم الحزب</Text>
                                <Text style={styles.partySlogan}>شعار الحزب</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.checkContainer}
                            onPress={() => toggleCheckBox(index)}
                        >
                            <View style={[styles.check, checkedItems[index] && styles.checkSelected]} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* زر "إنهاء التصويت" في أسفل الصفحة */}
            <TouchableOpacity style={styles.completeButton} onPress={navigateToEndvoteScreen}>
                <Text style={styles.completeButtonText}>إنهاء التصويت</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    timerDiv: {
        marginTop: 1,
        alignItems: 'center',
    },
    timerLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        alignItems: 'center',
        marginVertical: 5,
    },
    logoImage: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    lists: {
        alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff3131',
        marginBottom: 20,
        padding: 20,
        height: 100,
        width: '100%',
        borderRadius: 10,
    },
    data: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginHorizontal: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
    },
    personImage: {
        width: '100%',
        height: '100%',
    },
    name: {
        justifyContent: 'center',
    },
    partyName: {
        color: 'white',
        fontSize: 18,
        margin: 0,
    },
    partySlogan: {
        color: 'white',
        fontSize: 16,
        margin: 0,
    },
    checkContainer: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        width: 12,
        height: 12,
        backgroundColor: 'transparent',
    },
    checkSelected: {
        backgroundColor: 'white',
    },
    completeButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
