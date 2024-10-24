import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { db, firebase } from "../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { storage } from "../config";

const Welcome = ({ navigation }) => {
  const route = useRoute();
  const fullName = route.params.fullName;
  const password = route.params.password;
  const dob = route.params.dob;
  const streetName = route.params.streetName;
  const townCity = route.params.townCity;
  const provinceState = route.params.provinceState;
  const postalCode = route.params.postalCode;
  const mobileNumber = route.params.mobileNumber;
  const email = route.params.email;
  const username = route.params.username;
  const profilePicture = route.params.profilePicture;

  const handleAddPicture = async () => {
    if (profilePicture) {
      const response = await fetch(profilePicture);
      const blob = await response.blob();

      const storageRef = ref(storage, "propics/" + username + "_pro_pic");
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progress " + progress.toFixed() + "% done");
        },
        (err) => {
          // handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //console.log("File at " + downloadURL);
            await saveUserProfilePicture(
              email,
              firebase.auth().currentUser.uid,
              downloadURL
            );
          });
        }
      );
    }
  };

  async function saveUserProfilePicture(email, userID, url) {
    try {
      const docRef = await setDoc(doc(db, "proPics", email), {
        userID,
        url,
      });
      // console.log("Saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  registerUser = async (
    fullName,
    username,
    email,
    password,
    dob,
    streetName,
    townCity,
    provinceState,
    postalCode,
    profilePicture,
    mobileNumber,
    following = []
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://swap-a586e.firebaseapp.com",
          })
          .then(() => {
            // alert("Verification email has been sent");
          })
          .catch((err) => {
            alert(err.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                fullName,
                username,
                email,
                password,
                dob,
                streetName,
                townCity,
                provinceState,
                postalCode,
                profilePicture,
                mobileNumber,
                following,
              })
              .then(() => {
                handleAddPicture(); // Call handleAddPicture after setting user data

                navigation.navigate("SwapHome"); // Navigate to SwapDashboard
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      });
  };

  useEffect(() => {
    registerUser(
      fullName,
      username,
      email,
      password,
      dob,
      streetName,
      townCity,
      provinceState,
      postalCode,
      profilePicture,
      mobileNumber
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Swap</Text>
      <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      <Text style={styles.text}>Setting up your account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default Welcome;
