import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const Registration_password = ({ navigation }) => {
  const route = useRoute();
  const fullName = route.params.fullName;
  const [password, setPassword] = useState("");

  const validatePassword = () => {
    const passwordPattern =
      /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Create a password with at least 6 letters or numbers. It should be something that others can't guess."
      );
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validatePassword()) {
      // Navigate to the next screen
      navigation.navigate("SaveInfo", {
        fullName: fullName,
        password: password,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Create a Password</Text>
        <Text style={styles.subHeading}>
          Create a password with at least 6 letters or numbers. It should be
          something that others can't guess.
        </Text>
      </View>

      <View style={styles.inputSec}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 10,
  },
  header: {
    marginTop: -100,
    marginBottom: 300,
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
    marginTop: 200,
  },
});

export default Registration_password;
