import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Jordan() {
  const navigation = useNavigation();
  const pdfUri = 'https://drive.google.com/uc?id=1Qn6i3Ka2nP-xaSSg8yv_vpOrm0L5ZDYH'; // رابط الدستور
  const pdfUri2020 = 'https://drive.google.com/uc?id=1W7PUclWXJDCTM-QVL0PX9Rdl5dyQvQhk'; // قانون انتخاب النواب
  const pdfUri200 = 'https://drive.google.com/file/d/1VwHxHBcv6Ss3TSlPXupleurKw4YXa7Lp/view?usp=drive_link'; // قانون الهيئة المستقلة للانتخاب
  const pdfUri55 = 'https://drive.google.com/file/d/1rLTgdsJhEofYyKAKjMUgDHdl8TYSBd7B/view?usp=drive_link'; // قانون انتخاب الأحزاب
  const pdfUri76 = 'https://drive.google.com/file/d/19g2oe41Cj3dpQBpE1oO9KfuEI9Kkuuyi/view?usp=sharing'; // تعليمات تقديم الدعم المالي للأحزاب السياسية
  const pdfUri33 = 'https://drive.google.com/file/d/17yes8b-b6B3jhEf03ceKg_1jUjLVE8j1/view?usp=sharing'; // النظام المالي للهيئة المستقلة للانتخاب
  const pdfUri53 = 'https://drive.google.com/file/d/12XDYNBsHYS0MSP7Bi_dNGwB4FPz0o4Dh/view?usp=sharing'; // تعليمات تمويل الحملة الانتخابية للقوائم

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/images/kinggg.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* أيقونة ملف PDF للدستور الأردني */}
      <TouchableOpacity onPress={() => Linking.openURL(pdfUri)} style={styles.iconContainer}>
        <Image
          source={require('../assets/images/2000.jpeg')}
          style={styles.iconImage}
          resizeMode="contain"
        />
        <Text style={styles.iconLabel}>الدستور الأردني للانتخاب</Text>
      </TouchableOpacity>

      {/* القوانين والمستندات */}
      <View style={styles.fileRow}>
        {/* ملف قانون انتخاب النواب */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri2020)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>قانون الإنتخاب لمجلس النواب</Text>
        </TouchableOpacity>

        {/* قانون الهيئة المستقلة للانتخاب */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri200)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>قانون الهيئة المستقلة للانتخاب</Text>
        </TouchableOpacity>

        {/* قانون انتخاب الأحزاب */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri55)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>قانون انتخاب الأحزاب</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fileRow}>
        {/* تعليمات تقديم الدعم المالي للأحزاب السياسية */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri76)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>تعليمات تقديم الدعم المالي للأحزاب السياسية</Text>
        </TouchableOpacity>

        {/* النظام المالي للهيئة المستقلة للانتخاب */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri33)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>النظام المالي للهيئة المستقلة للانتخاب</Text>
        </TouchableOpacity>

        {/* تعليمات تمويل الحملة الانتخابية للقوائم */}
        <TouchableOpacity onPress={() => Linking.openURL(pdfUri53)} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/2000.jpeg')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>تعليمات تمويل الحملة الانتخابية للقوائم</Text>
        </TouchableOpacity>
      </View>

      {/* زر الرجوع إلى القائمة الرئيسية */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>الرجوع للقائمة الرئيسية</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '90%',
  },
  iconImage: {
    width: 40,
    height: 60,
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  fileRow: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Jordan;
