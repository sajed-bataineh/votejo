import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from 'react-native-vector-icons';

export default function ChangeDistrictScreen({ navigation }) {
  const [idCardImage, setIdCardImage] = useState(null);
  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [previousDistrict, setPreviousDistrict] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [proofOfResidence, setProofOfResidence] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkTheme(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleUploadIdCard = () => {
    console.log('Upload ID Card image');
  };

  const handleUploadProofOfResidence = () => {
    console.log('Upload Proof of Residence');
  };

  const handleSubmit = () => {
    console.log('Form submitted');
  };

  // Colors based on theme
  const backgroundColor = isDarkTheme ? '#333' : '#f0f0f0';
  const textColor = isDarkTheme ? '#fff' : '#333';
  const inputBackgroundColor = isDarkTheme ? '#555' : '#fff';
  const buttonColor = isDarkTheme ? '#888' : '#4CAF50';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Theme Toggle Switch */}
      <View style={styles.switchContainer}>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? '#fff' : '#333'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        <FontAwesome name={isDarkTheme ? 'moon-o' : 'sun-o'} size={24} color={textColor} style={styles.themeIcon} />
      </View>

      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={[styles.title, { color: textColor }]}>تغییر دائرتك الانتخابية</Text>
      <Text style={[styles.error, { color: 'red' }]}>
        لا يمكن الاستفادة من الخدمة قبل الانتهاء من إجراءات تغيير مكان الإقامة من قبل الجهات الحكومية المختصة بذلك
      </Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleUploadIdCard} style={[styles.uploadButton, { backgroundColor: buttonColor }]}>
          <Text style={styles.buttonText}>
            <FontAwesome name="upload" size={18} color="#fff" /> صورة عن الهوية الشخصية
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
          placeholder="رقم الهوية الوطنية"
          placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
          value={idNumber}
          onChangeText={setIdNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
          placeholder="الاسم بالكامل"
          placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
          placeholder="رقم الهاتف"
          placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={previousDistrict}
          onValueChange={(itemValue) => setPreviousDistrict(itemValue)}
          style={[styles.picker, { color: textColor, backgroundColor: inputBackgroundColor }]}
        >
          <Picker.Item label="اسم الدائرة الانتخابية السابقة" value="" />
          <Picker.Item label="اربد" value="اربد" />
          <Picker.Item label="الزرقا" value="الزرقا" />
          <Picker.Item label="عمان" value="عمان" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={newDistrict}
          onValueChange={(itemValue) => setNewDistrict(itemValue)}
          style={[styles.picker, { color: textColor, backgroundColor: inputBackgroundColor }]}
        >
          <Picker.Item label="اسم الدائرة الانتخابية الجديدة" value="" />
          <Picker.Item label="اربد" value="اربد" />
          <Picker.Item label="الزرقا" value="الزرقا" />
          <Picker.Item label="عمان" value="عمان" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleUploadProofOfResidence} style={[styles.uploadButton, { backgroundColor: buttonColor }]}>
          <Text style={styles.buttonText}>
            <FontAwesome name="upload" size={18} color="#fff" /> صورة عن إثبات السكن
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.submitButton, { backgroundColor: buttonColor }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>تغییر دائرتك الانتخابية</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  themeIcon: {
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  uploadButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
});
