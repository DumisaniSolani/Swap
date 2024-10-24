import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const TermsAndConditions = ({ navigation }) => {
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
  const username = route.params.username; // Should be "password" not "passWord"
  const handleLearnMore = () => {
    // Add logic to navigate to Learn More page
  };

  const handlePrivacyPolicy = () => {
    // Add logic to navigate to Privacy Policy page or open a link
    Linking.openURL("https://example.com/privacy-policy"); // Example URL, replace with your actual privacy policy URL
  };

  const handleAgree = () => {
    // Add logic to handle user agreement (e.g., navigate to the next step in registration)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Agree to Swap's Terms and policies</Text>
      </View>
      <Text style={styles.text}>
        People who use our services may have uploaded your contact info to Swap.{" "}
        <Text style={styles.learnMoreLink} onPress={handleLearnMore}>
          Learn more
        </Text>
      </Text>
      <Text style={styles.text}>
        By tapping I agree, you agree to create an account to Swap's Policy.
      </Text>
      <Text style={styles.text}>
        The Privacy Policy, which is available
        <Text style={styles.privacyPolicyLink} onPress={handlePrivacyPolicy}>
          {" "}
          here
        </Text>
        , describes the way we can use the information we collect when you
        create an account. For example, we use this information to provide,
        personalise, and improve our products, including ads.
      </Text>
      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() =>
          navigation.navigate("AddProfilePicture", {
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
        <Text style={styles.buttonText}>I agree</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 200,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  learnMoreLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  privacyPolicyLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  agreeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TermsAndConditions;
