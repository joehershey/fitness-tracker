import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import base64 from "base-64";
import { NavigationContainer, TabActions } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

function ProfileScreen(props) {
  const [state, setState] = useState({
    jsonGot: false,
    newPass: "",
    first: "",
    last: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    activity: 0,
  });

  const jsonGot = state.jsonGot;
  const jsonPut = state.jsonPut;
  const newPass = state.newPass;
  const first = state.first;
  const last = state.last;
  const calories = state.calories;
  const protein = state.protein;
  const carbs = state.carbs;
  const fat = state.fat;
  const activity = state.activity;

  if (state.jsonGot === false) {
    getUserData(props.user, props.token);
  }

  function getUserData(user, token) {
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + user;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== undefined) {
          alert("Please login again, session expired");
          props.navigation.navigate("Login");
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              jsonGot: true,
              first: responseJson.firstName,
              last: responseJson.lastName,
              calories: responseJson.goalDailyCalories,
              protein: responseJson.goalDailyProtein,
              carbs: responseJson.goalDailyCarbohydrates,
              fat: responseJson.goalDailyFat,
              activity: responseJson.goalDailyActivity,
            };
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onChangeFirst(text) {
    setState((prevState) => {
      return { ...prevState, first: text };
    });
  }
  function onChangeLast(text) {
    setState((prevState) => {
      return { ...prevState, last: text };
    });
  }
  function onChangeCalories(text) {
    setState((prevState) => {
      return { ...prevState, calories: text };
    });
  }
  function onChangeProtein(text) {
    setState((prevState) => {
      return { ...prevState, protein: text };
    });
  }
  function onChangeCarbs(text) {
    setState((prevState) => {
      return { ...prevState, carbs: text };
    });
  }
  function onChangeFat(text) {
    setState((prevState) => {
      return { ...prevState, fat: text };
    });
  }
  function onChangeActivity(text) {
    setState((prevState) => {
      return { ...prevState, activity: text };
    });
  }
  function onChangePass(text) {
    setState((prevState) => {
      return { ...prevState, newPass: text };
    });
  }

  function onSubmit() {
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + props.user;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      body: JSON.stringify({
        firstName: state.first,
        lastName: state.last,
        goalDailyCalories: state.calories,
        goalDailyProtein: state.protein,
        goalDailyCarbohydrates: state.carbs,
        goalDailyFat: state.fat,
        goalDailyActivity: state.activity,
        //password: state.newPass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== undefined) {
          alert(responseJson.message);
        } else {
          alert("no message (PUT)");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onSubmitPass() {
    if (state.newPass.length < 5) {
      alert("Password must be 5 or more characters");
    } else {
      newPassword();
    }
  }

  function newPassword() {
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + props.user;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      body: JSON.stringify({
        password: state.newPass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== undefined) {
          alert(responseJson.message);
        } else {
          alert("no message (PUT)");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onDelete() {
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + props.user;

    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== undefined) {
          alert(responseJson.message);
          props.navigation.navigate("Login");
        } else {
          alert("no message (PUT)");
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
          style={{ flex: 1, width: 50, height: 50, resizeMode: "contain" }}
          source={require("../assets/FTLogo.png")}
        />
        <TouchableHighlight
          onPress={() => props.navigation.navigate("Login")}
          style={{
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "dodgerblue",
            borderColor: "white",
            borderWidth: 1,
            position: "absolute",
            left: 320,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Ionicons name="ios-log-out" color="white" size={20} />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginRight: 5,
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ flex: 11 }}>
        <ScrollView
          contentConstainerstyle={{
            flex: 1,
          }}
          style={{
            backgroundColor: "#FFF",
          }}
        >
          <View //meant for the contents
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 50,
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
                shadowColor: "black",
                shadowOpacity: 0.1,
                shadowRadius: 0.1,
              }}
            >
              Your Profile
            </Text>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              First Name
            </Text>
            <TextInput
              onChangeText={(text) => onChangeFirst(text)}
              value={state.first}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
                alignSelf: "auto",
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Last Name
            </Text>
            <TextInput
              onChangeText={(text) => onChangeLast(text)}
              value={state.last}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Daily Calorie Goal (# of cals)
            </Text>
            <TextInput
              onChangeText={(text) => onChangeCalories(text)}
              value={state.calories.toString()}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Daily Protein Goal (in grams)
            </Text>
            <TextInput
              onChangeText={(text) => onChangeProtein(text)}
              value={state.protein.toString()}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Daily Carbs Goal (in grams)
            </Text>
            <TextInput
              onChangeText={(text) => onChangeCarbs(text)}
              value={state.carbs.toString()}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Daily Fat Goal (in grams)
            </Text>
            <TextInput
              onChangeText={(text) => onChangeFat(text)}
              value={state.fat.toString()}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
              Daily Activity Goal (in minutes)
            </Text>
            <TextInput
              onChangeText={(text) => onChangeActivity(text)}
              value={state.activity.toString()}
              style={{
                height: 30,
                marginBottom: 5,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <TouchableHighlight
              onPress={() => onSubmit()}
              style={{
                margin: 15,
                backgroundColor: "dodgerblue",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",

                  margin: 7,
                }}
              >
                Submit Changes
              </Text>
            </TouchableHighlight>

            <Text
              style={{ color: "dodgerblue", fontWeight: "bold", marginTop: 10 }}
            >
              Change Password
            </Text>
            <TextInput
              onChangeText={(text) => onChangePass(text)}
              value={state.newPass}
              secureTextEntry={true}
              style={{
                height: 30,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <TouchableHighlight
              onPress={() => onSubmitPass()}
              style={{
                borderRadius: 20,
                margin: 15,
                backgroundColor: "dodgerblue",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",

                  margin: 7,
                }}
              >
                Submit Password
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => onDelete()}
              style={{ margin: 10, backgroundColor: "red" }}
            >
              <Text style={{ color: "white", margin: 5, fontWeight: "bold" }}>
                Delete Account
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "dodgerblue",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "dodgerblue",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Today")}
            accessibilityRole="tab"
            accessibilityLabel="Today Tab"
            accessibilityHint="Double tap to view and edit your past day"
            style={{
              margin: 1,
              backgroundColor: "dodgerblue",
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRightWidth: 0.5,
              borderRightColor: "white",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-sunny" color="white" size={30} />
              <Text style={{ color: "white", margin: 5 }}>Today</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Activity")}
            accessibilityRole="tab"
            accessibilityLabel="Activity Tab"
            accessibilityHint="Double tap to view and edit your activities"
            style={{
              margin: 1,
              backgroundColor: "dodgerblue",
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRightWidth: 0.5,
              borderRightColor: "white",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="running" color="white" size={27} />
              <Text style={{ color: "white", margin: 5 }}>Activity</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Profile")}
            accessibilityRole="tab"
            accessibilityLabel="Profile Tab"
            accessibilityHint="Double tap to view and edit your profile"
            style={{
              margin: 1,
              backgroundColor: "dodgerblue",
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-person" color="navy" size={30} />
              <Text style={{ color: "navy", margin: 5 }}>Me</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
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

export default ProfileScreen;
