// SwapModalContent.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modal } from "react-native-web";

const SwapModalContent = ({ onClose, isVisible }) => {
  const handleSwapAction = () => {
    console.log("Performing swap action");
    onClose(); // Make sure onClose is called
  };
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      style={styles.container}
    >
      <Text style={styles.title}>Swap Modal Content</Text>
      <Text>
        This is where you can provide information or options for swapping.
      </Text>

      <TouchableOpacity style={styles.swapButton} onPress={handleSwapAction}>
        <Text style={styles.swapButtonText}>Swap Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  swapButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  swapButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default SwapModalContent;
