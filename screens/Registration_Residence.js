import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const RegistrationResidence = ({ navigation }) => {
  const [streetName, setStreetName] = useState("");
  const [townCity, setTownCity] = useState("");
  const [provinceState, setProvinceState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const password = route.params.password; // Should be "password" not "passWord"
  const dob = route.params.dob; // Should be "password" not "passWord"
  const handleNext = () => {
    // Add logic to handle the next step (e.g., navigate to the next registration screen)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>What's your place of residence?</Text>
        <Text style={styles.subHeading}>
          Enter the location you reside at. This info helps us target users
          around your region. Your location will not be shared unless you want
          to.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Street Name"
        value={streetName}
        onChangeText={(text) => setStreetName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Town/City"
        value={townCity}
        onChangeText={(text) => setTownCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Province/State"
        value={provinceState}
        onChangeText={(text) => setProvinceState(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
      />
      <TouchableOpacity
        style={styles.nextButton}
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
    marginTop: 10,
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
    marginBottom: 20,
    marginTop: 170,
  },
});

export default RegistrationResidence;
