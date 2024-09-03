import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
  title,
  showBackButton,
  rightTitle,
  onBackPress,
  onRightPress,
  
}) => {
  const navigation = useNavigation();
  const [isModalVisible1, setModalVisible1] = useState(false);
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightTitle && (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Text style={styles.rightTitle}>{rightTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
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
