import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const EmailAddressConfirmation = ({ navigation }) => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const password = route.params.password; // Should be "password" not "passWord"
  const dob = route.params.dob; // Should be "password" not "passWord"
  const streetName = route.params.streetName; // Should be "password" not "passWord"
  const townCity = route.params.townCity; // Should be "password" not "passWord"
  const provinceState = route.params.provinceState; // Should be "password" not "passWord"
  const postalCode = route.params.postalCode; // Should be "password" not "passWord"
  const mobileNumber = route.params.mobileNumber; // Should be "password" not "passWord"
  const email = route.params.email; // Should be "password" not "passWord"
  const handleNext = () => {
    // Add logic to handle the next step (e.g., verify the confirmation code)
  };

  const handleResendCode = () => {
    // Add logic to resend the confirmation code
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Enter the confirmation code</Text>
        <Text style={styles.subHeading}>
          Enter the 6-digit confirmation code sent to your<Text> </Text>{" "}
          <Text style={{ fontWeight: "bold" }}>{email}</Text>.
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        keyboardType="numeric"
        maxLength={6}
        value={confirmationCode}
        onChangeText={(text) => setConfirmationCode(text)}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("RegistrationUsername", {
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
      <View style={styles.resendLink}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RegistrationEmail", {
              fullName: fullName,
              password: password,
              dob: dob,
              streetName: streetName,
              townCity: townCity,
              provinceState: provinceState,
              postalCode: postalCode,
              mobileNumber: mobileNumber,
            })
          }
        >
          <Text style={styles.resendLinkText}>I didn't receive the code</Text>
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
    marginTop: -300,
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
  resendLink: {
    marginTop: 10,
    alignItems: "center",
  },
  resendLinkText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmailAddressConfirmation;
