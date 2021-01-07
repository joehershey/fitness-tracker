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

function Activity(props) {
  const [state, setState] = useState({
    jsonGot: false,
    id: props.id,
    name: props.name,
    duration: props.duration,
    calories: props.calories,
    date: props.date,
    th: ["Activity", "Duration", "Calories Burned", "Date"],
    td: [props.name, props.duration, props.calories, props.date],
  });

  const activities = state.activities;
  const jsonGot = state.jsonGot;
  const name = state.name;
  const duration = state.duration;
  const calories = state.calories;
  const date = state.date;
  const id = state.id;

  function editActivity() {}

  let dt = props.data.date.substring(0, props.data.date.indexOf("T"));
  let tm;
  if (props.data.date.length < 22) {
    tm = props.data.date.substring(
      props.data.date.indexOf("T") + 1,
      props.data.date.length - 3
    );
  } else {
    tm = props.data.date.substring(
      props.data.date.indexOf("T") + 1,
      props.data.date.indexOf(".") - 3
    );
  }

  return (
    <View
      accessible={false}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "dodgerblue",
        marginBottom: 0,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flex: 2,
          width: "75%",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      >
        <Text
          accessibilityHint={"From your activity: " + props.data.name}
          style={{
            margin: 7,
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {props.data.name}
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{ margin: 5, color: "white" }}
          accessibilityHint={"From your activity: " + props.data.name}
        >
          Date: {dt}
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{ margin: 5, color: "white" }}
          accessibilityHint={"From your activity: " + props.data.name}
        >
          Time: {tm}
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{ margin: 5, color: "white" }}
          accessibilityHint={"From your activity: " + props.data.name}
        >
          Duration: {props.data.duration} minutes
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{ margin: 5, color: "white" }}
          accessibilityHint={"From your activity: " + props.data.name}
        >
          {props.data.calories} calories burned!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "dodgerblue",
    justifyContent: "center",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});

export default Activity;
