import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const RegistrationEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const password = route.params.password; // Should be "password" not "passWord"
  const dob = route.params.dob; // Should be "password" not "passWord"
  const streetName = route.params.streetName; // Should be "password" not "passWord"
  const townCity = route.params.townCity; // Should be "password" not "passWord"
  const provinceState = route.params.provinceState; // Should be "password" not "passWord"
  const postalCode = route.params.postalCode; // Should be "password" not "passWord"
  const mobileNumber = route.params.mobileNumber; // Should be "password" not "passWord"

  const handleNext = () => {
    // Add logic to handle the next step (e.g., navigate to the next registration screen)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>What's your email address?</Text>
        <Text style={styles.subHeading}>
          Enter the email address on which you can be contacted. No one will see
          this on your profile unless you decide to share it.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.notificationText}>
        You may receive email notifications from us for security and login
        processes.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("EmailAdressConfirmation", {
            fullName: fullName,
            password: password,
            dob: dob,
            streetName: streetName,
            townCity: townCity,
            provinceState: provinceState,
            postalCode: postalCode,
            mobileNumber: mobileNumber,
            email: email,
          })
        }
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.mobileSignupButton}
        onPress={() =>
          navigation.navigate("RegistrationMobileNumber", {
            fullName: fullName,
            password: password,
            dob: dob,
            streetName: streetName,
            townCity: townCity,
            provinceState: provinceState,
            postalCode: postalCode,
          })
        }
      >
        <Text style={styles.mobileSignupButtonText}>
          Sign up with Mobile number
        </Text>
      </TouchableOpacity> */}
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
  notificationText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 20,
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
  mobileSignupButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  mobileSignupButtonText: {
    color: "#007BFF",
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
    marginTop: 250,
  },
});

export default RegistrationEmail;
