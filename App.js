import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from "react-native";
import LoginScreen from "./app/LoginScreen";
import ProfileScreen from "./app/ProfileScreen";
import SignupScreen from "./app/SignupScreen";
import ActivityView from "./app/ActivityView";
import ActivityScreen from "./app/ActivityScreen";
import DayScreen from "./app/DayScreen";
import base64 from "base-64";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  const [state, setState] = useState({
    token: "",
    username: "",
  });
  const token = state.token;
  const username = state.username;

  function setToken(thisToken) {
    setState((prevState) => {
      return { ...prevState, token: thisToken };
    });
  }

  function setUser(thisUser) {
    setState((prevState) => {
      return { ...prevState, username: thisUser };
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              setToken={(token) => setToken(token)}
              setUser={(user) => setUser(user)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {(props) => (
            <SignupScreen
              {...props}
              signup={(user, pass) => signUp(user, pass)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Activity"
          options={{
            animationEnabled: false,
          }}
        >
          {(props) => (
            <ActivityScreen
              {...props}
              token={state.token}
              user={state.username}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          options={{
            animationEnabled: false,
          }}
        >
          {(props) => (
            <ProfileScreen
              {...props}
              token={state.token}
              user={state.username}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Today"
          options={{
            animationEnabled: false,
          }}
        >
          {(props) => (
            <DayScreen {...props} token={state.token} user={state.username} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
});
