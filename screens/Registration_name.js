import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Registration_Name = ({ navigation }) => {
  const [fullName, setFullName] = useState("");

  const validateName = () => {
    if (fullName.trim() === "") {
      Alert.alert("Error", "Please enter your full name.");
      return false;
    }
    return true;
  };
  const handleNext = () => {
    if (validateName()) {
      // Navigate to the next screen
      navigation.navigate("Registration_password", { fullName: fullName });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>What is your name?</Text>
        <Text style={styles.subHeading}>
          Add your name so that friends can find you.
        </Text>
      </View>
      <View style={styles.inputSec}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          required={true}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.loginText}>
          <TouchableOpacity onPress={() => navigation.navigate("LandingPage")}>
            <View style={styles.footer}>
              <Text>Already have an account?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    marginTop: -120,
    marginBottom: 300,
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  inputSec: {},
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginLink: {
    color: "#007BFF",
    marginLeft: 5,
  },
  footer: {
    marginTop: 200,
  },
});

export default Registration_Name;
