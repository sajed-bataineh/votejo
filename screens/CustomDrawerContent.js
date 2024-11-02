// components/CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CustomDrawerContent({ navigation }) {
    const handleLogout = () => {
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية وتفريغ سجل التنقل
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
        });
    };

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            {/* زر إغلاق القائمة الجانبية */}
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
                <FontAwesome name="times-circle" size={30} color="red" />
            </TouchableOpacity>
            <Text style={styles.title}>قائمة الخدمات</Text>

            {/* عناصر القائمة */}
            <DrawerItem label="إجراءات الترشح للانتخاب" icon="id-card" onPress={() => navigation.navigate('ElectionProcedure')} />
            <DrawerItem label="تغيير دائرتك الانتخابية" icon="map-marker" onPress={() => navigation.navigate('ChangeDistrict')} />
            <DrawerItem label="الدستور الأردني للانتخاب" icon="gavel" onPress={() => navigation.navigate('Constitution')} />
            <DrawerItem label="معرفة أسماء المرشحين" icon="address-book" onPress={() => navigation.navigate('CandidateList')} />
            <DrawerItem label="نتائج عملية الانتخاب" icon="archive" onPress={() => navigation.navigate('ElectionResults')} />
            <DrawerItem label="الإرشادات والتعليمات" icon="book" onPress={() => navigation.navigate('Guidelines')} />
            <DrawerItem label="التواصل مع الدعم" icon="envelope" onPress={() => navigation.navigate('Support')} />

            {/* زر تسجيل الخروج */}
            <DrawerItem label="تسجيل الخروج" icon="sign-out" onPress={handleLogout} />
        </DrawerContentScrollView>
    );
}

// عنصر فردي داخل القائمة الجانبية
function DrawerItem({ label, icon, onPress }) {
    return (
        <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
            <FontAwesome name={icon} size={20} color="white" style={styles.icon} />
            <Text style={styles.itemText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#323232',
        color: 'white',
        paddingVertical: 10,
        marginBottom: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 40,
        marginBottom: 10,
        justifyContent: 'flex-start',
    },
    icon: {
        marginRight: 4,
    },
    itemText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
});
