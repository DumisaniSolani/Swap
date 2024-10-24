import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import User from "../js/User";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { firebase } from "../config";
//const logo = require("../assets/Images/logo-light-mode.png");

const LandingPage = ({ navigation }) => {
  const route = useRoute();
  const [useremail, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (useremail, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(useremail, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        {/* // <Image source={logo} style={styles.logoImage} /> */}
        <Ionicons name="swap-horizontal" size={80} color="black" />
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={useremail}
          onChangeText={(useremail) => setEmail(useremail)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => loginUser(useremail, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Registration_Name")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    marginTop: 0, // Set margin from top
  },
  logo: {
    marginTop: -150,
    marginBottom: 200,
  },
  logoImage: {
    maxWidth: 200,
    height: 100,
  },
  inputs: {
    marginBottom: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  options: {
    justifyContent: "center",
    marginTop: 15,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  createAccountButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingPage;
