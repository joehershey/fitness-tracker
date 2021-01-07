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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Activity from "./Activity";
import DatePicker from "react-native-datepicker";

function ActivityView(props) {
  const [state, setState] = useState({
    activities: [],
    jsonGot: false,
    name: "",
    duration: 0,
    calories: 0,
    date: "",
    id: 0,
    edit: false,
    focus: props.focus,
    dailyMinsGoal: 0,
    dailyMins: 0,
    focusTrack: 1,
    today: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const activities = state.activities;
  const jsonGot = state.jsonGot;
  const name = state.name;
  const duration = state.duration;
  const calories = state.calories;
  const date = state.date;
  const id = state.id;
  const edit = state.edit;
  const focus = state.focus;
  const dailyMinsGoal = state.dailyMinsGoal;
  const dailyMins = state.dailyMins;
  const focusTrack = state.focusTrack;
  const today = state.today;

  if (props.focus && state.focusTrack === 1) {
    getUserData(props.user, props.token);
    setState((prevState) => {
      return {
        ...prevState,
        focusTrack: 0,
      };
    });
  } else if (!props.focus && state.focusTrack === 0) {
    setState((prevState) => {
      return {
        ...prevState,
        focusTrack: 1,
      };
    });
  }

  if (state.jsonGot === false) {
    getUserData(props.user, props.token);
    getMinsGoal();
  }

  function editExercise(id) {
    for (let i = 0; i < state.activities.length; i++) {
      if (state.activities[i].id === id) {
        setState((prevState) => {
          return {
            ...prevState,
            id: id,
            name: state.activities[i].name,
            duration: state.activities[i].duration,
            calories: state.activities[i].calories,
            date: state.activities[i].date,
            edit: true,
          };
        });
        break;
      }
    }
    setModalVisible(true);
  }

  function editSubmit() {
    let url = "https://mysqlcs639.cs.wisc.edu/activities/" + state.id;
    let cal = state.calories.replace(/[^0-9]/g, "");
    if (cal.length === 0) {
      cal = "0";
    }

    let dur = state.duration.replace(/[^0-9]/g, "");
    if (dur.length === 0) {
      dur = "0";
    }
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      body: JSON.stringify({
        name: state.name,
        duration: dur,
        calories: cal,
        date: state.date,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === "Activity updated!") {
          alert(responseJson.message);
          setState((prevState) => {
            return {
              ...prevState,
              jsonGot: false,
              edit: false,
            };
          });

          clearStates();
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function clearStates() {
    setState((prevState) => {
      return {
        ...prevState,
        jsonGot: false,
        name: "",
        duration: 0,
        calories: 0,
        date: "",
      };
    });
  }

  function onChangeName(text) {
    setState((prevState) => {
      return { ...prevState, name: text };
    });
  }

  function setEdit() {
    setState((prevState) => {
      return { ...prevState, edit: false };
    });
  }

  function setDate(date) {
    setState((prevState) => {
      return { ...prevState, date: date };
    });
  }

  function onChangeLength(text) {
    setState((prevState) => {
      return { ...prevState, duration: text };
    });
  }

  function onChangeCalories(text) {
    setState((prevState) => {
      return { ...prevState, calories: text };
    });
  }

  function getUserData(user, token) {
    let url = "https://mysqlcs639.cs.wisc.edu/activities";

    fetch(url, {
      method: "GET",
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
        } else {
          let today = new Date().toLocaleDateString();
          let year = today.substring(today.length - 4, today.length);
          today = today.substring(0, today.length - 5);
          today = year + "-" + today.replace("/", "-");

          let actDate;
          if (props.screen === "day") {
            let dayActs = [];
            for (let i = 0; i < responseJson.activities.length; i++) {
              actDate = responseJson.activities[i].date.substring(
                0,
                responseJson.activities[i].date.indexOf("T")
              );
              if (actDate !== today) {
              } else {
                dayActs.push(responseJson.activities[i]);
              }
            }
            let totalMins = 0;
            for (let i = 0; i < dayActs.length; i++) {
              totalMins = totalMins + dayActs[i].duration;
            }
            setState((prevState) => {
              return {
                ...prevState,
                activities: dayActs,
                jsonGot: true,
                dailyMins: totalMins,
                today: today,
              };
            });
          } else {
            setState((prevState) => {
              return {
                ...prevState,
                activities: responseJson.activities,
                jsonGot: true,
              };
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addActivity(user, token) {
    let url = "https://mysqlcs639.cs.wisc.edu/activities";

    //make sure calories and duration are numeric

    let cal = state.calories.replace(/[^0-9]/g, "");
    if (cal.length === 0) {
      cal = "0";
    }

    let dur = state.duration.replace(/[^0-9]/g, "");
    if (dur.length === 0) {
      dur = "0";
    }

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      body: JSON.stringify({
        name: state.name,
        duration: dur,
        calories: cal,
        date: state.date,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.id !== undefined) {
          alert(responseJson.message);
          setState((prevState) => {
            return {
              ...prevState,
              jsonGot: false,
            };
          });

          clearStates();
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteExercise(id) {
    let url = "https://mysqlcs639.cs.wisc.edu/activities/" + id;
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
        if (responseJson.message === "Activity deleted!") {
          alert(responseJson.message);
          setState((prevState) => {
            return {
              ...prevState,
              jsonGot: false,
            };
          });

          clearStates();
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getMinsGoal() {
    let url = "https://mysqlcs639.cs.wisc.edu/users/" + props.user;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== undefined) {
          props.navigation.navigate("Login");
        } else {
          setState((prevState) => {
            return {
              ...prevState,

              dailyMinsGoal: responseJson.goalDailyActivity,
            };
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderActivities() {
    let acts = [];
    for (let i = 0; i < state.activities.length; i++) {
      acts.push(
        <View
          style={{
            justifyContent: "center",
            alignItems: "stretch",
            alignContent: "center",
            width: "85%",
            backgroundColor: "white",
          }}
        >
          <Activity
            data={state.activities[i]}
            id={state.activities[i].id}
            name={state.activities[i].name}
            calories={state.activities[i].calories}
            date={state.activities[i].date}
            duration={state.activities[i].duration}
          />

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableHighlight
              //onPress={() => openModal()}
              onPress={() => editExercise(state.activities[i].id)}
              accessibilityRole="button"
              accessibilityLabel="edit"
              accessibilityHint={
                "Double-tap to edit your activity, " + state.activities[i].name
              }
              style={{
                borderColor: "dodgerblue",
                borderWidth: 1,
                alignSelf: "center",
                margin: 5,
                marginBottom: 25,
                borderRadius: 3,
              }}
            >
              <Text style={{ color: "dodgerblue", margin: 5 }}>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => deleteExercise(state.activities[i].id)}
              accessibilityRole="button"
              accessibilityLabel="delete"
              accessibilityHint={
                "Double-tap to delete your activity, " +
                state.activities[i].name
              }
              style={{
                borderColor: "red",
                borderWidth: 1,
                alignSelf: "center",
                margin: 5,
                marginBottom: 25,
                borderRadius: 3,
              }}
            >
              <Text style={{ color: "red", margin: 5 }}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return acts;
  }

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        margin: 0,
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{
                //borderWidth: 2,
                borderColor: "dodgerblue",
                borderRadius: 7,
                alignSelf: "flex-end",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setEdit();
              }}
            >
              <Ionicons
                name="md-exit"
                color="grey"
                style={{ fontSize: 30, left: 10, bottom: 10 }}
              />
            </TouchableHighlight>
            <Text
              style={{
                color: "dodgerblue",
                justifyContent: "center",
                fontWeight: "bold",
                margin: 5,
              }}
            >
              What activity did you do?
            </Text>
            <TextInput
              placeholder="Activity"
              value={state.name}
              onChangeText={(text) => onChangeName(text)}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text
              style={{
                color: "dodgerblue",
                textAlign: "center",
                fontWeight: "bold",
                margin: 5,
              }}
            >
              How long did you do this activity (in minutes)
            </Text>
            <TextInput
              placeholder="Length in minutes"
              value={state.duration}
              onChangeText={(text) => onChangeLength(text)}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>

            <Text
              style={{
                color: "dodgerblue",
                alignContent: "center",
                fontWeight: "bold",
                margin: 5,
              }}
            >
              How many calories did you burn?
            </Text>
            <TextInput
              placeholder="Calories Burned"
              value={state.calories}
              onChangeText={(text) => onChangeCalories(text)}
              style={{
                height: 30,
                marginBottom: 15,
                width: "50%",
                borderColor: "dodgerblue",
                borderWidth: 2,
              }}
            ></TextInput>
            <Text
              style={{
                color: "dodgerblue",
                alignContent: "center",
                fontWeight: "bold",
                margin: 5,
              }}
            >
              When did you do this activity?
            </Text>
            <DatePicker
              style={{ width: "50%" }}
              date={state.date}
              locale="can"
              placeholder="Select date and time"
              format="YYYY-MM-DDTHH:mm"
              minDate="2020-01-01"
              mode="datetime"
              is24Hour={true}
              maxDate="2021-12-30"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              style={{
                borderWidth: 1.5,
                borderColor: "dodgerblue",
                margin: 3,
                marginBottom: 10,
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                if (state.edit === true) {
                  editSubmit();
                } else {
                  addActivity(props.user, props.token);
                }
              }}
            >
              <Text style={{ color: "white", margin: 3, fontWeight: "bold" }}>
                Done
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={{ margin: 20, backgroundColor: "dodgerblue", borderRadius: 5 }}
        onPress={() => {
          setModalVisible(true);
        }}
        accessibilityRole="button"
        accessibilityHint="Press to create a new activity"
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ color: "white", fontSize: 20, margin: 3, marginRight: 0 }}
          >
            New Activity
          </Text>
          <Ionicons
            name="ios-add-circle-outline"
            color="white"
            size="20"
            style={{ margin: 3 }}
          />
        </View>
      </TouchableHighlight>
      {renderActivities()}
      {props.screen === "day" ? (
        <View
          style={{
            backgroundColor: "darkblue",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              margin: 10,
              fontSize: 25,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              shadowColor: "black",
              shadowOpacity: 0.1,
              shadowRadius: 0.1,
            }}
          >
            Daily Minutes Goal
          </Text>
          {state.dailyMins >= state.dailyMinsGoal ? (
            <View>
              <Text
                style={{
                  margin: 10,
                  marginBottom: 0,
                  fontSize: 25,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  shadowColor: "black",
                  shadowOpacity: 0.1,
                  shadowRadius: 0.1,
                  color: "lightgreen",
                  borderWidth: 3,
                  borderColor: "lightgreen",
                }}
              >
                {state.dailyMins}/{state.dailyMinsGoal}
              </Text>
              <Text
                style={{
                  margin: 15,
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontStyle: "italic",
                  shadowColor: "black",
                  shadowOpacity: 0.1,
                  shadowRadius: 0.1,
                  color: "lightgreen",
                }}
              >
                Congrats on reaching your goal!
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  margin: 0,
                  marginBottom: 0,
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                  shadowColor: "black",
                  shadowOpacity: 0.1,
                  shadowRadius: 0.1,
                  color: "yellow",
                  borderWidth: 3,
                  borderColor: "yellow",
                }}
              >
                {state.dailyMins}/{state.dailyMinsGoal}
              </Text>
              <Text
                style={{
                  margin: 15,
                  fontSize: 20,
                  textAlign: "center",
                  fontStyle: "italic",
                  shadowColor: "black",
                  shadowOpacity: 0.1,
                  shadowRadius: 0.1,
                  color: "yellow",
                }}
              >
                You still need {state.dailyMinsGoal - state.dailyMins} minutes
                to reach your goal. You can do it!
              </Text>
            </View>
          )}
        </View>
      ) : null}
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
    alignItems: "stretch",
    marginTop: 22,
  },
});

export default ActivityView;
