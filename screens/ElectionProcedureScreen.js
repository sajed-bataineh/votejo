// screens/NominationOptionsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function NominationOptionsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>اختيار النوع الصحيح</Text>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PartyCandidate')}>
              <FontAwesome name="newspaper-o" size={22} color="black" style={styles.icon} />
              <Text style={styles.text}>الترشح لقائمة</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('DistrictCandidate')}>
               <FontAwesome name="handshake-o" size={22} color="black" style={styles.icon} />
                 <Text style={styles.text}>الترشح لحزب</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('WithdrawCandidateScreen')}>
                <FontAwesome name="outdent" size={22} color="black" style={styles.icon} />
                <Text style={styles.text}>الانسحاب</Text>
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        width: 255,
        height: 45,
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
