import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import MapScreen from "./screens/MapScreen";

import PublishScreen from "./screens/PublishScreen";
import TrendScreen from "./screens/TrendScreen";
import SelectionScreen from "./screens/SelectionScreen.js";
import ProfileScreen from "./screens/ProfileScreen";
import ListScreen from "./screens/ListScreen";
import EventScreen from "./screens/EventScreen";
import AmisScreen from "./screens/AmisScreen";
import MessageScreen from "./screens/MessageScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import events from "./reducers/events";
import event from "./reducers/event";
import openModal from "./reducers/openModal";
import list from "./reducers/list";
import conversation from "./reducers/conversation";

const store = configureStore({
  reducer: { event, openModal, user, events, list,conversation },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Selection") {
            iconName = "bolt";
          } else if (route.name === "Map") {
            iconName = "compass";
          } else if (route.name === "Publish") {
            iconName = "plus";
          } else if (route.name === "Trend") {
            iconName = "star";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgba(22, 21, 25, 1)",
        tabBarInactiveTintColor: "#b2b2b2",
        headerShown: false,
      })}
    >
      
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Publish" component={PublishScreen} />
      <Tab.Screen name="Trend" component={TrendScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Selection" component={SelectionScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Amis" component={AmisScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

