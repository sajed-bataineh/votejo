import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [showParties, setShowParties] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [expandedListId, setExpandedListId] = useState(null);
  const navigation = useNavigation();

  const parties = [
    { id: 1, name: 'اسم الحزب 1' },
    { id: 2, name: 'اسم الحزب 2' },
    { id: 3, name: 'اسم الحزب 3' },
  ];

  const lists = [
    {
      id: 1,
      listName: 'اسم القائمه 1',
      candidates: ['مرشح 1', 'مرشح 2', 'مرشح 3'],
    },
    {
      id: 2,
      listName: 'اسم القائمه 2',
      candidates: ['مرشح 4', 'مرشح 5', 'مرشح 6'],
    },
    {
      id: 3,
      listName: 'اسم القائمه 3',
      candidates: ['مرشح 7', 'مرشح 8', 'مرشح 9'],
    },
  ];

  const toggleList = (listId) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Party Table */}
      <TouchableOpacity onPress={() => setShowParties(!showParties)} style={styles.tableHeader}>
        <Text style={styles.tableTitle}>جدول للاحزاب</Text>
      </TouchableOpacity>
      {showParties && (
        <View style={styles.table}>
          <FlatList
            data={parties}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableText}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* List Table */}
      <TouchableOpacity onPress={() => setShowLists(!showLists)} style={[styles.tableHeader, { backgroundColor: 'green' }]}>
        <Text style={styles.tableTitle}>جدول للقوائم</Text>
      </TouchableOpacity>
      {showLists && (
        <View style={styles.table}>
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <TouchableOpacity onPress={() => toggleList(item.id)}>
                  <Text style={styles.tableText}>{item.listName}</Text>
                </TouchableOpacity>
                {expandedListId === item.id && (
                  <View style={styles.candidates}>
                    {item.candidates.map((candidate, index) => (
                      <View key={index} style={styles.candidateRow}>
                        <Image
                          source={require('../assets/images/wemon.png')}
                          style={styles.candidateImage}
                        />
                        <Text style={styles.candidateText}>{candidate}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>الرجوع للصفحة الرئيسية</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  tableHeader: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    marginVertical: 10,
    alignItems: 'center',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  tableText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  candidates: {
    marginTop: 8,
    paddingLeft: 10,
  },
  candidateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  candidateImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  candidateText: {
    fontSize: 14,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
