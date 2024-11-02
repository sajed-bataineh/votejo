// screens/ElectionResultsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ElectionResultsScreen() {
    const [expandedList, setExpandedList] = useState(null);

    // بيانات القوائم الانتخابية مع تفاصيل المرشحين كمثال
    const electionResults = [
        {
            name: "القائمة الأولى",
            votes: 1200,
            percentage: "40%",
            candidates: [
                { name: "المرشح 1", votes: 500 },
                { name: "المرشح 2", votes: 400 },
                { name: "المرشح 3", votes: 300 },
            ],
        },
        {
            name: "القائمة الثانية",
            votes: 900,
            percentage: "30%",
            candidates: [
                { name: "المرشح 4", votes: 450 },
                { name: "المرشح 5", votes: 300 },
                { name: "المرشح 6", votes: 150 },
            ],
        },
        // المزيد من القوائم الانتخابية
    ];

    // بيانات الأحزاب
    const partyResults = [
        { name: "حزب الأمل", votes: 1500, percentage: "50%" },
        { name: "حزب النور", votes: 800, percentage: "25%" },
        { name: "حزب الاتحاد", votes: 700, percentage: "25%" },
        // المزيد من الأحزاب
    ];

    const handleToggleList = (index) => {
        setExpandedList(expandedList === index ? null : index);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>نتائج عملية الانتخاب</Text>

            {/* قسم القوائم الانتخابية */}
            <Text style={styles.sectionHeader}>القوائم الانتخابية</Text>
            {electionResults.map((list, index) => (
                <View key={index} style={styles.resultCard}>
                    <TouchableOpacity onPress={() => handleToggleList(index)}>
                        <Text style={styles.listName}>{list.name}</Text>
                        <View style={styles.voteDetails}>
                            <Text style={styles.voteText}>الأصوات: {list.votes}</Text>
                            <Text style={styles.percentageText}>النسبة: {list.percentage}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* عرض المرشحين عند الضغط على القائمة */}
                    {expandedList === index && (
                        <View style={styles.candidateContainer}>
                            {list.candidates.map((candidate, i) => (
                                <View key={i} style={styles.candidateRow}>
                                    <Text style={styles.candidateName}>{candidate.name}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ))}

            {/* قسم الأحزاب */}
            <Text style={styles.sectionHeader}>الأحزاب</Text>
            {partyResults.map((party, index) => (
                <View key={index} style={styles.resultCard}>
                    <Text style={styles.listName}>{party.name}</Text>
                    <View style={styles.voteDetails}>
                        <Text style={styles.voteText}>الأصوات: {party.votes}</Text>
                        <Text style={styles.percentageText}>النسبة: {party.percentage}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#29B373',
        marginVertical: 15,
        alignSelf: 'flex-start',
    },
    resultCard: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    listName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    voteDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    voteText: {
        fontSize: 16,
        color: '#333',
    },
    percentageText: {
        fontSize: 16,
        color: '#29B373',
        fontWeight: 'bold',
    },
    candidateContainer: {
        marginTop: 10,
        width: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    candidateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    candidateName: {
        fontSize: 16,
        color: '#555',
    },
});

