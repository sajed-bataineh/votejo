import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

function AddPartyCandidate({ navigation }) { 
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
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '/');
      setAppointmentDate(formattedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setAppointmentTime(`${hours}:${minutes}`);
    }
  };

  const isValidDate = (date) => {
    const [year, month, day] = date.split('/').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    return day <= daysInMonth;
  };

  const isValidTime = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour >= 7 && hour <= 15 && minute >= 0 && minute < 60;
  };

  const handleSubmit = () => {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}$/;
  
    if (!fullName || !phone || !study || !experience || !policy || !isNominated || !nominationType || !appointmentDate || !appointmentTime || !districtName) {
      alert("يرجى ملء جميع الحقول المطلوبة!");
      return;
    }
  
    if (!dateRegex.test(appointmentDate) || !isValidDate(appointmentDate)) {
      alert("يرجى إدخال تاريخ صحيح بصيغة (YYYY/MM/DD)!");
      return;
    }
  
    if (!timeRegex.test(appointmentTime) || !isValidTime(appointmentTime)) {
      alert("يرجى إدخال وقت صحيح بصيغة (HH:mm) من الساعة 7 إلى 15!");
      return;
    }
  
    Alert.alert(
      "تمت إضافة المرشح",
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
        <Text style={styles.title}>إضافة مرشح جديد</Text>
      </View>

      <TextInput style={styles.input} placeholder="الاسم بالكامل" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="رقم الهاتف" value={phone} onChangeText={handlePhoneChange} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="المؤهل العلمي" value={study} onChangeText={setStudy} />
      <TextInput style={styles.input} placeholder="تجارب عملية" value={experience} onChangeText={setExperience} />
      <TextInput style={styles.input} placeholder="شعار المرشح" value={policy} onChangeText={setPolicy} />
      <TextInput style={styles.input} placeholder="اسم الحزب" value={districtName} onChangeText={setDistrictName} />

      <View style={styles.selectContainer}>
        <Text>هل سبق لك بالترشح:</Text>
        <Picker selectedValue={isNominated} onValueChange={setIsNominated}>
          <Picker.Item label="اختيار" value="" />
          <Picker.Item label="نعم" value="true" />
          <Picker.Item label="لا" value="false" />
        </Picker>
      </View>

      <View style={styles.selectContainer}>
        <Text>مسار الترشح:</Text>
        <Picker selectedValue={nominationType} onValueChange={setNominationType}>
          <Picker.Item label="اختيار" value="" />
          <Picker.Item label="حر" value="def" />
          <Picker.Item label="كوتا" value="wemon" />
          <Picker.Item label="مسيحي" value="arth" />
          <Picker.Item label="شركسي" value="nice" />
        </Picker>
      </View>

      <View style={styles.datePickerContainer}>
        <Text>تاريخ الموعد:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>{appointmentDate || "اختر التاريخ"}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.timePickerContainer}>
        <Text>وقت الموعد:</Text>
        <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timeButtonText}>{appointmentTime || "اختر الوقت"}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>إضافة مرشح</Text>
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
  selectContainer: {
    marginBottom: 15,
    width: '100%',
  },
  datePickerContainer: {
    marginBottom: 15,
    width: '100%',
  },
  timePickerContainer: {
    marginBottom: 15,
    width: '100%',
  },
  dateButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timeButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'green',
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

export default AddPartyCandidate;
