import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FAB, Card, Paragraph, IconButton, Button } from "react-native-paper";
import moment from "moment";

const Header = ({
  title,
  showBackButton,
  rightTitle,
  onBackPress,
  onRightPress,
  isShare,
  shareButton,
  isRightButton,
  onRightButtonPress,
  selectedDate
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightTitle && (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Text style={styles.rightTitle}>{rightTitle}</Text>
        </TouchableOpacity>
      )}
      {isRightButton && (
        <Button onPress={onRightButtonPress}>
            {moment(selectedDate).format("DD-MM-YYYY")}
          </Button>
      )}
      {isShare && (
        <TouchableOpacity style={styles.rightButton}>
          <IconButton icon="share" size={20} onPress={shareButton} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 7,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 3,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    // textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightButton: {
    padding: 10,
  },
  rightTitle: {
    fontSize: 16,
    color: "#6200ee",
  },
});

export default Header;
