import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function SignupScreen(props) {
  const [state, setState] = useState({
    username: "Username",
    password: "Password",
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
    signUp(state.username, state.password);
  }

  function signUp(user, pass) {
    fetch("https://mysqlcs639.cs.wisc.edu/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson.message);
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
              fontSize: 25,
              color: "dodgerblue",
              fontWeight: "bold",
              textAlign: "center",
              shadowColor: "white",
              shadowOpacity: 0.1,
              shadowRadius: 0.1,
            }}
          >
            Enter a username and password below to sign up!
          </Text>

          <View //username textbox view
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Ionicons name="ios-person" color="dodgerblue" size={34} />
            <TextInput
              onChangeText={(text) => onChangeUsername(text)}
              value={state.username}
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
          <View //password textbox view
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Ionicons name="ios-lock" color="dodgerblue" size={40} />
            <TextInput
              onChangeText={(text) => onChangePassword(text)}
              value={state.password}
              secureTextEntry={true}
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
              borderColor: "white",
              borderWidth: 2,
              margin: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                margin: 7,
              }}
            >
              Sign Up!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(screen) => props.navigation.navigate("Login")}
            style={{ borderWidth: 2, borderColor: "dodgerblue" }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontStyle: "italic",
                margin: 2,
              }}
            >
              Have an account? Log In!
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

export default SignupScreen;
