import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";

const profile_default = require("../assets/Images/Profile-Picture.png");

const AddProfilePicture = ({ navigation }) => {
  const [profilePicture, setImage] = useState("");
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
  const handleAddPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // setProfilePicture(result.assets[0].uri);
      setImage(result.assets[0].uri);
    } else {
      console.log("Select Image again");
    }
  };

  const handleSkip = () => {
    // Add logic to handle skipping profile picture setup
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Add a Profile Picture</Text>
        <Text style={styles.subHeading}>
          Add a profile picture so that your friends know it's you. Everyone
          will be able to see your picture.
        </Text>
      </View>
      <TouchableOpacity onPress={handleAddPicture}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <View style={styles.defaultImage} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("WelcomeSwap", {
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
            profilePicture: profilePicture,
          })
        }
      >
        <Text style={styles.buttonText}>Add Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() =>
          navigation.navigate("WelcomeSwap", {
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
            profilePicture: profilePicture,
          })
        }
      >
        <Text style={styles.buttonText}>Skip</Text>
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
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    marginTop: -100,
    marginBottom: 200,
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  defaultImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: "#007BFF", // Apply the same background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProfilePicture;
