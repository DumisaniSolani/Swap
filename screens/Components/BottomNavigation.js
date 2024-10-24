import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { db, firebase } from "../../config";
import { collection, query, where, getDocs } from "firebase/firestore";

const BottomNavigation = ({ navigation, currentUser }) => {
  const route = useRoute();
  //const ctUser = currentUser;
  const [userPP, setUserPP] = useState("");

  useEffect(() => {
    const fetchProfilePics = async () => {
      try {
        const q = query(
          collection(db, "proPics"),
          where("userID", "==", firebase.auth().currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //   console.log(doc.id, " => ", doc.data().url);
          setUserPP(doc.data().url);
        });
      } catch (error) {
        console.error("Error fetching profile pictures:", error);
      }
    };
    fetchProfilePics();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 5,
        position: "absolute",
        bottom: 0,
        width: "105%",
        backgroundColor: "#f8f8f8",
        height: 80,
        marginLeft: 0,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("SwapHome", { currentUser })}
      >
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="search-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddPost", { currentUser })}
      >
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { currentUser, userPP })}
      >
        <Ionicons name="person-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
