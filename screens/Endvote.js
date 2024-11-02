import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';

const App = ({ navigation }) => {
  
  useEffect(() => {
    // ضبط الصفحة الحالية كالجذر الجديد لتجنب العودة إلى الصفحة السابقة
    navigation.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });

    // تعيين مؤقت للتنقل تلقائيًا إلى الصفحة الرئيسية بعد 5 ثوانٍ
    const timer = setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 9000); // المدة بالميلي ثانية، هنا 5000 = 5 ثوانٍ

    // تنظيف المؤقت عند الخروج من الشاشة لتجنب مشاكل الأداء
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.icon} />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button1}>
          <Text style={styles.buttonText}>لقد انتهيت من التصويت شكرا لك</Text>
        </View>
        <View style={styles.button2}>
          <Text style={styles.buttonText}>
            أخبرنا برأيك حول التطبيق بحالة كان لديك أي اقتراح، سنكون سعداء بمعرفته عبر بريدنا الإلكتروني
          </Text>
        </View>
        <View style={styles.button2} onPress={() => Linking.openURL('mailto:Vote_JO@gmail.com')}>
          <Text style={styles.buttonText}>Vote_JO@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('MainScreen')}>
          <Text style={styles.buttonText}>العودة إلى الصفحة الرئيسية</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '80%',
  },
  button1: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Noto Naskh Arabic',
  },
});

export default App;
