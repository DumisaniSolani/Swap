import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import BottomNavigation from "./BottomNavigation";

const BottomButtons = () => {
  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.swapButton}>
        <Text>Swap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
        <Text>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  iconsContainer: {
    flexDirection: "row",
  },

  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 5,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    bottom: -250,
  },
  swapButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default BottomButtons;
