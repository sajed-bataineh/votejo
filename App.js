import React, { useState, useEffect } from 'react';
import { Alert, Button, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import i18n, { changeLanguage, loadLanguage } from './i18n'; // تأكد من إعداد ملف i18n.js

import MainScreen from './screens/MainScreen';
import FaceVerificationScreen from './screens/FaceVerificationScreen';
import VoterDetailsScreen from './screens/VoterDetailsScreen';
import ElectionProcedureScreen from './screens/ElectionProcedureScreen';
import PartyCandidate from './screens/PartyCandidate';
import DistrictCandidate from './screens/DistrictCandidate';
import WithdrawCandidateScreen from './screens/WithdrawCandidateScreen';
import ChangeDistrictScreen from './screens/ChangeDistrictScreen';
import ConstitutionScreen from './screens/ConstitutionScreen';
import CandidateListScreen from './screens/CandidateListScreen';
import ElectionResultsScreen from './screens/ElectionResultsScreen';
import GuidelinesScreen from './screens/GuidelinesScreen';
import SupportScreen from './screens/SupportScreen';
import LogoutScreen from './screens/LogoutScreen';
import Vot from './screens/Vot';
import VotingScreen from './screens/VotingScreen';
import Endvote from './screens/Endvote';
import CustomDrawerContent from './screens/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function VoterDrawer({ toggleTheme, isDarkTheme, toggleLanguage }) {
    return (
        <Drawer.Navigator
            initialRouteName="VoterDetails"
            drawerContent={(props) => (
                <CustomDrawerContent {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} toggleLanguage={toggleLanguage} />
            )}
        >
            <Drawer.Screen name="VoterDetails">
                {(props) => <VoterDetailsScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="ElectionProcedure">
                {(props) => <ElectionProcedureScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="PartyCandidate">
                {(props) => <PartyCandidate {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="DistrictCandidate">
                {(props) => <DistrictCandidate {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="WithdrawCandidateScreen">
                {(props) => <WithdrawCandidateScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="ChangeDistrict">
                {(props) => <ChangeDistrictScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Constitution">
                {(props) => <ConstitutionScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="CandidateList">
                {(props) => <CandidateListScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="ElectionResults">
                {(props) => <ElectionResultsScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Guidelines">
                {(props) => <GuidelinesScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Support">
                {(props) => <SupportScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Logout">
                {(props) => <LogoutScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Vot">
                {(props) => <Vot {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Voting">
                {(props) => <VotingScreen {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
            <Drawer.Screen name="Endvote">
                {(props) => <Endvote {...props} isDarkTheme={isDarkTheme} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

function MainStack({ toggleTheme, isDarkTheme, toggleLanguage }) {
    return (
        <Stack.Navigator initialRouteName="MainScreen">
            <Stack.Screen name="MainScreen">
                {(props) => <MainScreen {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} toggleLanguage={toggleLanguage} />}
            </Stack.Screen>
            <Stack.Screen name="FaceVerification">
                {(props) => <FaceVerificationScreen {...props} isDarkTheme={isDarkTheme} />}
            </Stack.Screen>
            <Stack.Screen name="VoterDetails">
                {(props) => <FaceVerificationScreen {...props} isDarkTheme={isDarkTheme} />}
            </Stack.Screen>
            <Stack.Screen name="VoterDrawer" options={{ headerShown: false }}>
                {(props) => <VoterDrawer {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} toggleLanguage={toggleLanguage} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const { t } = useTranslation();

    // دالة لتبديل الثيم
    const toggleTheme = async () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // دالة لتبديل اللغة
    const toggleLanguage = async () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        await changeLanguage(newLanguage);
    };

    useEffect(() => {
        const loadSettings = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme !== null) {
                setIsDarkTheme(savedTheme === 'dark');
            }
            await loadLanguage();
        };

        loadSettings();

        Alert.alert(
            "الشروط والأحكام",
            "بالضغط على زر 'موافق'، أنت توافق على الشروط والأحكام الخاصة بالتطبيق.",
            [
                {
                    text: "موافق",
                    onPress: () => {},
                },
            ],
            { cancelable: false }
        );
    }, []);

    return (
        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
            <MainStack toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} toggleLanguage={toggleLanguage} />
        </NavigationContainer>
    );
}
