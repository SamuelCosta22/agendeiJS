import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home_Section from "../home_section/home_section.jsx";
import Calendar_Section from "../calendar_section/calendar_section.jsx";
import Profile_Section from "../profile_section/profile_section.jsx";

import icon from "../../constants/icon.js"
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function Main(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home_Section} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Image source={icon.logo} style={{width: 125, height: 29}} />
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.home} style={{width: 25, height: 25, opacity: focused ? 1 : 0.6}} />
                },
                tabBarShowLabel: false,
            }} />
            <Tab.Screen name="Calendar" component={Calendar_Section} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Image source={icon.logo} style={{width: 125, height: 29}} />
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.calendar} style={{width: 25, height: 25, opacity: focused ? 1 : 0.6}} />
                },
                tabBarShowLabel: false,
                unmountOnBlur: true,
            }} />
            <Tab.Screen name="Profile" component={Profile_Section} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Image source={icon.logo} style={{width: 125, height: 29}} />
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.profile} style={{width: 25, height: 25, opacity: focused ? 1 : 0.6}} />
                },
                tabBarShowLabel: false,
                unmountOnBlur: true,
            }} />
        </Tab.Navigator>
    )
}