import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const userData = useSelector((state) => state?.auth?.userData);

  console.log("userData in route", userData);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData?.token ? (
        <Stack.Screen name="MainStack" component={MainStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
