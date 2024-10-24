import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const RegisterUsername = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const password = route.params.password; // Should be "password" not "passWord"
  const dob = route.params.dob; // Should be "password" not "passWord"
  const streetName = route.params.streetName; // Should be "password" not "passWord"
  const townCity = route.params.townCity; // Should be "password" not "passWord"
  const provinceState = route.params.provinceState; // Should be "password" not "passWord"
  const postalCode = route.params.postalCode; // Should be "password" not "passWord"
  const email = route.params.email; // Should be "password" not "passWord"
  const mobileNumber = route.params.mobileNumber; // Should be "password" not "passWord"

  const handleNext = () => {
    // Add logic to handle the next step (e.g., validate and save the username)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Create a username</Text>
        <Text style={styles.subHeading}>
          Add a username or use our suggestion. You can change this at any
          point.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("terms_and_conditions", {
            fullName: fullName,
            password: password,
            dob: dob,
            streetName: streetName,
            townCity: townCity,
            provinceState: provinceState,
            postalCode: postalCode,
            email: email,
            mobileNumber: mobileNumber,
            username: username,
          })
        }
      >
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
    marginTop: -50,
    marginBottom: 200,
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
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
    marginTop: 350,
  },
});

export default RegisterUsername;
