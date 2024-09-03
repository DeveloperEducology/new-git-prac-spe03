import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
import { getData } from "../utils/helperFunctions";
import { saveUserData } from "../redux/reducers/auth";

import store from "../redux/store";

const { dispatch } = store;


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const userData = useSelector((state) => state?.auth?.userData);

  console.log("userData in route", userData);


  const [isLoading, setLoading] = React.useState(false);


  React.useEffect(() => {
    initUser();
  }, []);

  const initUser = async () => {
    try {
      let data = await getData("userData");
      console.log("data in login", data)
      if (!!data) {
        dispatch(saveUserData(JSON.parse(data)));
      }
    } catch (error) {
      console.log("no data found");
    }
  };



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
