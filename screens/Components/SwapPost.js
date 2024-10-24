import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import Carousel from "react-native-reanimated-carousel";
import Carousel from "react-native-snap-carousel";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  firestore,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config";
import { useRoute } from "@react-navigation/native";
import EllipsisModal from "./EllipsisModal";
import SwapModalContent from "./SwapModalContent";
//import auth from "@react-native-firebase/auth";

const SwapPost = ({
  images,
  username,
  description,
  Profile_picture,
  verified,
  postID,
  navigation,
  post,
  onEllipsisPress,
  currentUser,
  documentId,
}) => {
  const [saved, setSaved] = useState(false);
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [SwapmodalVisible, setSwapModalVisible] = useState(false);

  const handleSwapClick = () => {
    setSwapModalVisible(true);
  };

  const handleSwapModalClose = () => {
    console.log("Closing modal");
    setSwapModalVisible(false);
  };
  const toggleModal = () => {
    onEllipsisPress(postID);
    setModalVisible(!modalVisible);
  };

  const addfollower = async (documentId, arrayField, newItem) => {
    const docRef = doc(db, "users", documentId);

    try {
      await updateDoc(docRef, {
        [arrayField]: arrayUnion(newItem),
      });
      console.log("Item added to the array successfully!");
    } catch (error) {
      console.error("Error adding item to the array:", error);
    }
  };
  const checkIfFollowing = async (currentUser, checkID) => {
    try {
      const array = currentUser.following;
      return array.includes(checkID);
    } catch (error) {
      console.log("Error checking if current user follows user");
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const follows = await checkIfFollowing(currentUser, post.userID);
      setIsFollowing(follows);
    };

    fetchData();
  }, [currentUser, post]);

  const getUser = async (email) => {
    try {
      const userCollection = collection(db, "users");
      const q = query(userCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];

        const userData = userDoc.data();
        userData.id = userDoc.id;
        return userData;
      } else {
        console.log("User not found with email:", email);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  };

  const toggleFollow = async (documentId) => {
    const mail = post.userID;
    if (!(mail === route.params.user.email)) {
      if (isFollowing) {
        // Unfollow logic

        const postOwner = await getUser(mail);
      } else {
        // Follow logic

        const postOwner = await getUser(mail);
        const follows = await checkIfFollowing(currentUser, post.userID);
        console.log(follows);

        if (!follows) {
          await addfollower(documentId, "following", post.userID);
          await addfollower(postOwner.id, "followers", currentUser.email);
        } else {
          console.log("already following: ", post.userID);
        }
      }
      // Update the local state
      setIsFollowing(!isFollowing);
    }
  };
  useEffect(() => {
    //check if the post was saved or not.
    // Check if the post is saved when the component mounts
    // and update the saved state accordingly

    const checkSavedStatus = async () => {
      try {
        const savedPostRef = collection(db, "SavedPosts");
        const querySnapshot = await getDocs(
          query(savedPostRef, where("postID", "==", postID))
        );

        if (querySnapshot.size > 0) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      } catch (error) {
        console.log("error checking saved post: ", error);
      }
    };

    checkSavedStatus();
  }, [postID]);

  const handleSaveClick = async () => {
    try {
      const savedPostRef = collection(db, "SavedPosts");
      const querySnapshot = await getDocs(
        query(savedPostRef, where("postID", "==", postID))
      );

      if (querySnapshot.size > 0) {
        // Post is already saved, so remove it
        const savedPostData = querySnapshot.docs[0].data();
        if (savedPostData.liker === route.params.user.email) {
          // Remove the post because the logged-in user matches the saved post user
          await deleteDoc(doc(db, "SavedPosts", querySnapshot.docs[0].id));
          setSaved(false);
          console.log("Post unliked ID: ", savedPostData.postID);
        } else {
          // Do nothing or show an error message since the logged-in user doesn't match the saved post user
        }
      } else {
        const docRef = await addDoc(collection(db, "SavedPosts"), {
          postID: postID,
          owner: username,
          liker: route.params.user.email,
        });
        setSaved(true);
        console.log("Post Like ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  };

  const renderImage = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: item }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };
  const handleSwapCost = () => {
    // Implement the logic for handling Swap Cost
    console.log("Swap Cost clicked");
  };

  const handleSwapDescription = () => {
    // Implement the logic for handling Swap Description
    console.log("Swap Description clicked");
  };

  const handleFollowUser = () => {
    // Implement the logic for handling Follow User
    toggleFollow(documentId);
    // console.log("Follow User clicked -->", documentId);
  };

  const handleSaveItem = () => {
    handleSaveClick(postID, { navigation });
  };

  const handleAboutAccount = () => {
    // Implement the logic for handling About Account
    console.log("About Account clicked");
  };

  const offerSwap = () => {
    // Implement the logic for handling About Account
    handleSwapClick();
    console.log("offer swap clicked");
  };

  const handleReport = () => {
    // Implement the logic for handling Report
    console.log("Report clicked");
  };

  return (
    <View style={styles.swapPost}>
      <View style={styles.swapPostHeader}>
        <View style={styles.profile}>{Profile_picture}</View>
        <View style={styles.username}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{username}</Text>
        </View>

        <TouchableOpacity onPress={toggleModal}>
          <Ionicons
            name={modalVisible ? "ellipsis-horizontal" : "ellipsis-vertical"}
            size={24}
            color="black"
            styles={{ marginTop: 15 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{description}</Text>

      {/* Images Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          data={images}
          renderItem={renderImage}
          sliderWidth={300}
          itemWidth={250}
          loop={true}
        />
      </View>

      {/* Like, Comment, View Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={offerSwap}>
          <Ionicons name="swap-horizontal" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSaveClick(postID, { navigation });
          }}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <EllipsisModal
        isVisible={modalVisible}
        onClose={toggleModal}
        onSwapCost={handleSwapCost}
        onSwapDescription={handleSwapDescription}
        onFollowUser={handleFollowUser}
        onSaveItem={handleSaveItem}
        onAboutAccount={handleAboutAccount}
        onReport={handleReport}
        offerSwap={offerSwap}
        post={post}
        saved={saved}
        isFollowing={isFollowing}
        userEmail={route.params.user.email}
      />
      <SwapModalContent
        isVisible={SwapmodalVisible}
        onRequestClose={handleSwapModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swapPost: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  username: {
    flexDirection: "row",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: -220,
    marginTop: 15,
  },
  description: {
    marginBottom: 10,
  },
  carouselContainer: {
    marginVertical: 10,
    marginLeft: 40,
  },
  carouselItem: {
    borderRadius: 5,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 200,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  swapPostHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verificatinCheck: {
    marginLeft: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SwapPost;
