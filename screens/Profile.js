import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import BottomNavigation from "./Components/BottomNavigation";
import { useRoute } from "@react-navigation/native";
import { firebase, db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import PostModal from "./Components/PostModal";

const CustomModal = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text>List of Options</Text>
        <TouchableOpacity
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("LandingPage");
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const ProfilePage = ({ navigation }) => {
  const route = useRoute();
  const user = route.params.currentUser;
  const userPP = route.params.userPP;
  const following = user.following;
  const followers = user.followers;
  const [userProfilePic, setUserProfilePic] = useState();

  const [isModalVisible, setModalVisible] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postsNumb, setPostNumb] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("available");

  const toggleModal = () => {
    // console.log(user);
    //  console.log();
    setModalVisible(!isModalVisible);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
  // Function to handle pressing the "View All Posts" button
  const handleViewAllPosts = () => {
    setSelectedCategory(null); // Reset selected category to show all posts
  };

  const fetchUserPosts = async () => {
    const postsCollectionRef = collection(db, "swapposts");
    const postsQuery = query(
      postsCollectionRef,
      where("userID", "==", user.email)
    );

    const postsSnapshot = await getDocs(postsQuery);

    const postsData = postsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setUserPosts(postsData);
    setPostNumb(postsData.length);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const openPostModal = (postId) => {
    const selectedPost = userPosts.find((post) => post.id === postId);
    setSelectedPost(selectedPost);
    toggleModal();
  };

  const filteredPosts = userPosts.filter(
    (post) => post.state === selectedCategory
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image source={{ uri: userPP }} style={styles.profilePicture} />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text>{postsNumb}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text>{followers.length}</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text>{following.length}</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text>Bio: Lorem ipsum dolor sit amet...</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text>Share Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postbuttons}>
        <TouchableOpacity
          style={[
            styles.availableButton,
            selectedCategory === "available" && { backgroundColor: "#007BFF" },
          ]}
          onPress={() => handleCategoryPress("available")}
        >
          <Text>Available Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.negotiationsButton,
            selectedCategory === "under_negotiations" && {
              backgroundColor: "#FFC107",
            },
          ]}
          onPress={() => handleCategoryPress("under_negotiations")}
        >
          <Text>Negotiations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tradedButton,
            selectedCategory === "gone" && { backgroundColor: "#DC3545" },
          ]}
          onPress={() => handleCategoryPress("gone")}
        >
          <Text>Traded Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={handleViewAllPosts}
        >
          <Text>Saved Posts</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.previousPosts}>
          {filteredPosts.map((post, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openPostModal(post.id)}
            >
              <View
                style={[
                  styles.postCard,
                  {
                    backgroundColor: (() => {
                      switch (post.state) {
                        case "available":
                          return "#28A745";
                        case "under_negotiations":
                          return "#FFC107";
                        case "gone":
                          return "#DC3545";
                        default:
                          return "#E0E0E0";
                      }
                    })(),
                  },
                ]}
              >
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} />
      {selectedPost && (
        <PostModal
          isVisible={isModalVisible}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
      <CustomModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  stats: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    marginLeft: 20,
  },
  bio: {
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 300,
    marginBottom: 0,
    marginLeft: 15,
    position: "absolute",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
  },
  previousPosts: {},
  modalContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 140,
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#555555",
  },
  postbuttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 150,
    marginBottom: -100,
  },
  availableButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  negotiationsButton: {
    flex: 1,
    backgroundColor: "#FFC107",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  tradedButton: {
    flex: 1,
    backgroundColor: "#DC3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewAllButton: {
    flex: 1,
    backgroundColor: "#343A40",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },
});

export default ProfilePage;
