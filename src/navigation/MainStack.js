import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CakeBookingForm from "../screens/cake/CakeBookingForm";
import CakeBookingList from "../screens/cake/CakeBookingList";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateAgent from "../screens/admin/CreateAgent";
import Settings from "../screens/admin/Settings";
import DispatchNoteForm from "../screens/agent/DispatchNoteForm";
import DispatchForm from "../screens/admin/DispatchForm";



const Tab = createMaterialBottomTabNavigator();


function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStacks() {
  return (
    <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="dispatch-form" component={DispatchNoteForm} />
      <Stack.Screen name="Home" component={CakeBookingList} />
      <Stack.Screen name="form" component={CakeBookingForm} />
      <Stack.Screen name="CreateAgent" component={CreateAgent} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Orders" component={MyStacks} />
      <Tab.Screen name="AdminHome" component={AdminHomeScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return <MyTabs />;
}

export default MainStack;
