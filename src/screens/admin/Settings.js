import { StyleSheet, Text, View, Image, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveUserData } from "../../redux/reducers/auth";
import store from "../../redux/store";
import { showError } from "../../utils/helperFunctions";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

const { dispatch } = store;

const Settings = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const userId = userData?._id;
  const [stats, setStats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = "http://192.168.29.124:3001/order-stats";

  const filterStats = stats.filter((stat) => stat.agentId === userId);

  const getOrderCountsByStatusForAgents = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const result = await response.json();

      if (result.status) {
        setStats(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching order counts:", error.message);
    }
  };

  useEffect(() => {
    getOrderCountsByStatusForAgents();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrderCountsByStatusForAgents().then(() => setRefreshing(false));
  }, []);

  const onLogout = () => {
    AsyncStorage.removeItem("userData")
      .then(() => {
        console.log("User removed successfully!");
        dispatch(saveUserData({}));
      })
      .catch((error) => {
        showError("Data not found");
      });
  };

  const renderStatsItem = ({ item }) => (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>Delivered: {item.delivered || 0}</Text>
      <Text style={styles.statsText}>Pending: {item.pending || 0}</Text>
      <Text style={styles.statsText}>Processing: {item.processing || 0}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings" rightTitle="Log Out" onRightPress={onLogout} />

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={userData?.profileImage && { uri: userData.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userData?.name}</Text>
      </View>

      {userData?.userType === "admin" && (
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("ListAgents")}
        >
          List Agents
        </Button>
      )}

      <FlatList
        data={filterStats}
        renderItem={renderStatsItem}
        keyExtractor={(item) => item.agentId.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No stats available.</Text>}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#6200ee",
  },
  statsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 3,
  },
  statsText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
