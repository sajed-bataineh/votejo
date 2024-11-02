import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const VotingComponent = () => {
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [selectedCandidatesList1, setSelectedCandidatesList1] = useState({});
  const [selectedCandidatesList2, setSelectedCandidatesList2] = useState({});
  const [isList1Checked, setIsList1Checked] = useState(false);
  const [isList2Checked, setIsList2Checked] = useState(false);

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      navigation.navigate('Voting');
    }
  }, [timeRemaining, navigation]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleCandidateSelection = (candidate, list) => {
    if (timeRemaining <= 0) {
      Alert.alert(t("alertTitle"), t("timeEndedMessage"));
      return;
    }

    if (list === 1 && !isList2Checked) {
      const updatedCandidates = { ...selectedCandidatesList1, [candidate]: !selectedCandidatesList1[candidate] };
      setSelectedCandidatesList1(updatedCandidates);
      setIsList1Checked(true); 
      setIsList2Checked(false);
      setSelectedCandidatesList2({});
    } else if (list === 2 && !isList1Checked) {
      const updatedCandidates = { ...selectedCandidatesList2, [candidate]: !selectedCandidatesList2[candidate] };
      setSelectedCandidatesList2(updatedCandidates);
      setIsList2Checked(true); 
      setIsList1Checked(false);
      setSelectedCandidatesList1({});
    } else {
      Alert.alert(t("alertTitle"), t("oneListOnlyMessage"));
    }
  };

  const toggleListSelection = (list) => {
    if (timeRemaining <= 0) {
      Alert.alert(t("alertTitle"), t("timeEndedMessage"));
      return;
    }

    if (list === 1) {
      setIsList1Checked(!isList1Checked);
      setIsList2Checked(false);
      setSelectedCandidatesList2({});
    } else {
      setIsList2Checked(!isList2Checked);
      setIsList1Checked(false);
      setSelectedCandidatesList1({});
    }
  };

  const navigateToVotingScreen = () => {
    navigation.navigate('Voting'); 
  };

  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* زر الترجمة */}
      <View style={styles.languageSwitchContainer}>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageSwitchButton}>
          <Text style={styles.languageSwitchText}>{i18n.language === 'en' ? 'AR' : 'EN'}</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      <View style={styles.header}>
        <Text style={styles.headerText}>{t("timeRemaining")}</Text>
        <Text style={[styles.headerText, timeRemaining <= 30 ? styles.timeWarning : null]}>
          {timeRemaining > 0 ? formatTime(timeRemaining) : t("timeEnded")}
        </Text>
      </View>

      {/* قائمة المرشحين */}
      {/* القائمة الأولى */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <TouchableOpacity
            style={[styles.checkbox, isList1Checked && styles.checkboxSelected]}
            onPress={() => toggleListSelection(1)}
          />
          <View style={styles.listTitle}>
            <Text style={styles.listHeaderText}>{t("firstListName")}</Text>
          </View>
        </View>
        <View style={styles.candidateContainer}>
          <View style={styles.candidateRowHeader}>
            <Text style={styles.candidateTitle}>{t("candidateName")}</Text>
            <Text style={styles.candidateTitle}>{t("candidateLogo")}</Text>
          </View>
          {["اسم المرشح 1", "اسم المرشح 2", "اسم المرشح 3"].map((candidate, index) => (
            <View key={index} style={styles.candidateRow}>
              <TouchableOpacity
                style={[styles.checkbox, selectedCandidatesList1[candidate] && styles.checkboxSelected]}
                onPress={() => toggleCandidateSelection(candidate, 1)}
              />
              <Image source={require('../assets/images/men.png')} style={styles.candidateImage} />
              <Text style={styles.candidateText}>{candidate}</Text>
              <Text style={styles.candidateText}>{t("candidateLogo")} {candidate}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.separator} />

      {/* القائمة الثانية */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <TouchableOpacity
            style={[styles.checkbox, isList2Checked && styles.checkboxSelected]}
            onPress={() => toggleListSelection(2)}
          />
          <View style={styles.listTitle}>
            <Text style={styles.listHeaderText}>{t("secondListName")}</Text>
          </View>
        </View>
        <View style={styles.candidateContainer}>
          <View style={styles.candidateRowHeader}>
            <Text style={styles.candidateTitle}>{t("candidateName")}</Text>
            <Text style={styles.candidateTitle}>{t("candidateLogo")}</Text>
          </View>
          {["اسم المرشح 4", "اسم المرشح 5", "اسم المرشح 6"].map((candidate, index) => (
            <View key={index} style={styles.candidateRow}>
              <TouchableOpacity
                style={[styles.checkbox, selectedCandidatesList2[candidate] && styles.checkboxSelected]}
                onPress={() => toggleCandidateSelection(candidate, 2)}
              />
              <Image source={require('../assets/images/men.png')} style={styles.candidateImage} />
              <Text style={styles.candidateText}>{candidate}</Text>
              <Text style={styles.candidateText}>{t("candidateLogo")} {candidate}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.completeButton} onPress={navigateToVotingScreen}>
        <Text style={styles.completeButtonText}>{t("completeVoting")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeWarning: {
    color: 'red',
  },
  listContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'green',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: '#000',
  },
  listTitle: {
    flex: 1,
  },
  listHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  candidateContainer: {
    padding: 10,
  },
  candidateRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  candidateTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  candidateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  candidateImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  candidateText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    height: 20,
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

export default VotingComponent;
