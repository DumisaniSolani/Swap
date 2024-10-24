import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const SaveInfo = ({ navigation }) => {
  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const passWord = route.params.password; // Should be "password" not "passWord"

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Save your Login info?</Text>
        <Text style={styles.subHeader}>
          We'll save login info for<Text> </Text>
          <Text style={{ fontWeight: "bold" }}> {fullName}</Text>, so you won't
          have to enter it on your device next time you login.
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            navigation.navigate("RegistrationDOB", {
              fullName: fullName,
              password: passWord,
            })
          }
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notNowButton}
          onPress={() =>
            navigation.navigate("RegistrationDOB", {
              fullName: fullName,
              password: passWord,
            })
          }
        >
          <Text style={styles.buttonText}>Not Now</Text>
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
  subHeader: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  notNowButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
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

export default SaveInfo;
