import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserData } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { showError } from "../../utils/helperFunctions";
import { Button } from "react-native-paper";

const { dispatch } = store;

const Settings = ({ navigation }) => {
  const onLogout = () => {
    AsyncStorage.removeItem("userData")
      .then((res) => {
        console.log("user remove suceessfully..!!");
        dispatch(saveUserData({}));
      })
      .catch((error) => {
        showError("Data not found");
      });
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button onPress={onLogout}>Logout</Button>
      <Button onPress={() => navigation.navigate("CreateAgent")}>
        Create Agent
      </Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 25,
  },
});
