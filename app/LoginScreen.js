import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LoginScreen(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const username = state.username;
  const password = state.password;

  function onChangeUsername(text) {
    setState((prevState) => {
      return { ...prevState, username: text };
    });
  }

  function onChangePassword(text) {
    setState((prevState) => {
      return { ...prevState, password: text };
    });
  }

  function checkCredentials() {
    logIn(state.username, state.password);
  }

  function logIn(user, pass) {
    fetch("https://mysqlcs639.cs.wisc.edu/login", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64.encode(user + ":" + pass),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.token === undefined) {
          alert("Username or password incorrect");
        } else {
          props.setToken(responseJson.token);
          props.setUser(user);
          props.navigation.navigate("Profile");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "dodgerblue",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ flex: 1, width: 80, height: 80, resizeMode: "contain" }}
          source={require("../assets/FTLogo.png")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#303030",
          flex: 6,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              marginBottom: 20,
              fontSize: 30,
              color: "dodgerblue",
              fontWeight: "bold",
              textAlign: "center",
              shadowColor: "white",
              shadowOpacity: 0.1,
              shadowRadius: 0.1,
            }}
          >
            Welcome to FitnessTracker, Login or sign up below!
          </Text>

          <View //username textbox view
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Ionicons
              name="ios-person"
              color="dodgerblue"
              size={34}
              accessible={false}
            />
            <TextInput
              onChangeText={(text) => onChangeUsername(text)}
              placeholder="username"
              placeholderTextColor="lightgrey"
              value={state.username}
              accessibilityHint="Enter your username"
              style={{
                height: 30,
                margin: 5,
                width: "50%",
                color: "white",
                borderColor: "grey",
                borderWidth: 2,
              }}
            ></TextInput>
          </View>
          <View //password textbox view
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Ionicons
              name="ios-lock"
              color="dodgerblue"
              size={40}
              accessible={false}
            />
            <TextInput
              onChangeText={(text) => onChangePassword(text)}
              value={state.password}
              placeholder="password"
              placeholderTextColor="lightgrey"
              secureTextEntry={true}
              accessibilityHint="Enter your Password"
              style={{
                height: 30,
                margin: 5,
                width: "50%",
                borderColor: "grey",
                color: "white",
                borderWidth: 2,
              }}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => checkCredentials()}
            style={{
              backgroundColor: "dodgerblue",
              marginBottom: 5,
              shadowColor: "dodgerblue",
              shadowRadius: 10,
              shadowOpacity: 100,
            }}
            accessibilityRole="button"
            accessibilityLabel="login button"
            accessibilityHint="double tap to sign in"
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                margin: 7,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Signup")}
            style={{ borderWidth: 1, borderColor: "dodgerblue" }}
          >
            <Text style={{ color: "white", fontStyle: "italic", margin: 2 }}>
              Don't have an account? Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: "dodgerblue", flex: 1 }}></View>
    </SafeAreaView>
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

export default LoginScreen;
