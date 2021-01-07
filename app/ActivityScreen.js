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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import base64 from "base-64";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import ActivityView from "./ActivityView";
import { useIsFocused } from "@react-navigation/native";

function ActivityScreen(props) {
  const isFocused = useIsFocused();

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
              alignItems: "stretch",
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
              Your Activities
            </Text>
            <View style={{}}>
              <ActivityView
                user={props.user}
                token={props.token}
                screen={"Act"}
                focus={isFocused}
              />
            </View>
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
            <FontAwesome5 name="running" color="navy" size={27} />
            <Text style={{ color: "navy", margin: 5 }}>Activity</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => props.navigation.navigate("Profile")}
          accessibilityRole="tab"
          accessibilityLabel="Profile Tab"
          accessibilityHint="Double tap to view and edit your Profile"
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
            <Ionicons name="ios-person" color="white" size={30} />
            <Text style={{ color: "white", margin: 5 }}>Me</Text>
          </View>
        </TouchableHighlight>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default ActivityScreen;
