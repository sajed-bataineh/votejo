import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function WithdrawCandidate({ navigation }) { 
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [study, setStudy] = useState('');
  const [experience, setExperience] = useState('');
  const [isNominated, setIsNominated] = useState('');
  const [nominationType, setNominationType] = useState('');
  const [policy, setPolicy] = useState('');
  const [financialStatus, setFinancialStatus] = useState('');
  const [partyName, setPartyName] = useState('');
  const [districtName, setDistrictName] = useState('');

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  };

  const handlePhoneChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    setPhone(numericInput);
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !phone.trim() || !study.trim() || !experience.trim() || !policy.trim() || !districtName.trim()) {
      alert("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }

    Alert.alert(
      "تم تقديم الطلب",
      "طلبك قيد الدراسة",
      [
        {
          text: "موافق",
          onPress: () => navigation.navigate('MainScreen') 
        }
      ]
    );
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.icon} />
        <Text style={styles.title}>الانسحاب من الترشح</Text>
      </View>

      <TextInput style={styles.input} placeholder="الاسم بالكامل" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="رقم الهاتف" value={phone} onChangeText={handlePhoneChange} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="المؤهل العلمي" value={study} onChangeText={setStudy} />
      <TextInput style={styles.input} placeholder="تجارب عملية" value={experience} onChangeText={setExperience} />
      <TextInput style={styles.input} placeholder="شعار المرشح" value={policy} onChangeText={setPolicy} />
      <TextInput style={styles.input} placeholder="اسم القائمة" value={districtName} onChangeText={setDistrictName} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>انسحاب من الترشح</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>الرجوع للقائمة الرئيسية</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  backButton: {
    marginTop: 20,               // إضافة مسافة أعلى الزر
    paddingVertical: 10,         // المسافة العمودية داخل الزر
    paddingHorizontal: 20,       // المسافة الأفقية داخل الزر
    backgroundColor: '#007AFF',  // لون الخلفية (أزرق)
    borderRadius: 10,            // زوايا دائرية للزر
    alignItems: 'center',        // توسيط النص داخل الزر
},
backButtonText: {
    color: '#fff',               // لون النص أبيض
    fontSize: 16,                // حجم الخط
    fontWeight: 'bold',          // الخط عريض
},


  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  submitButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WithdrawCandidate;
