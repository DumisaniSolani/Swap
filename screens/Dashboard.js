import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  memo,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import Header from "./Components/Header";
import SwapPost from "./Components/SwapPost";
import BottomButtons from "./Components/BottomButtons";
import BottomNavigation from "./Components/BottomNavigation";
import { useRoute } from "@react-navigation/native";
import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, firebase } from "../config";

const SwapHome = ({ navigation }) => {
  const route = useRoute();
  const scrollViewRef = useRef(null);

  const [currentUser, setUser] = useState("");
  const [swapPosts, setSwapPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = route.params.user;
  const MemorizedSwapPost = memo(SwapPost);
  const getPP = async (userID) => {
    try {
      const docRef = doc(db, "proPics", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const url = docSnap.data().url;
        return url;
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null; // Return null in case of an error
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // This will remove the back button
    });
  }, [navigation]);

  const getSwapPosts = async () => {
    try {
      const colRef = collection(db, "swapposts");
      const querySnapshot = await getDocs(query(colRef, orderBy("createdAt")));

      let swap_posts = [];
      for (const post of querySnapshot.docs) {
        const userID = post.data().userID;

        const pp = await getPP(userID);

        swap_posts.push({
          ...post.data(),
          id: post.id,
          pp: pp,
        });
      }

      setSwapPosts(swap_posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching and sorting swap posts: ", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("fetching user:", user.uid);
        const id = user.uid;
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get();
        if (snapshot.exists) {
          // Use exists() here

          setUser(snapshot.data());
        } else {
          //  console.log("User doesn't exist");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchDataWithRetry = async (retryCount) => {
      try {
        await getSwapPosts();
      } catch (error) {
        console.log(
          `Error fetching data. Retrying... (Retry Count: ${retryCount})`
        );
        if (retryCount < 3) {
          // Retry up to 3 times
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay before retrying
          await fetchDataWithRetry(retryCount + 1);
        } else {
          console.error("Maximum retry limit reached. Unable to fetch data.");
          setLoading(false); // Stop loading indicator
        }
      }
    };

    fetchDataWithRetry(1); // Start with the first retry
  }, []); // Empty dependency array ensures this effect runs only once, after component mount

  const onRefresh = () => {
    setRefreshing(true);

    // Call your function to fetch data from Firebase here
    getSwapPosts(); // Assuming getSwapPosts() is your function to fetch data

    setRefreshing(false);
  };
  const handleEllipsisPress = (postId) => {
    const postIndex = swapPosts.findIndex((post) => post.id === postId);
    const scrollPosition = postIndex * 350; // Adjust POST_HEIGHT as needed
    scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
  };
  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {swapPosts.map((post) => (
            <MemorizedSwapPost
              key={post.id} // Ensure each component has a unique key
              images={post.postImages} // Assuming 'images' is a field in your swapposts collection
              username={post.username}
              description={post.description}
              Profile_picture={
                post.pp ? (
                  <Image
                    source={{ uri: post.pp }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                ) : null
              }
              verified={post.verified}
              postID={post.id}
              navigation={navigation}
              post={post}
              currentUser={currentUser}
              onEllipsisPress={(postId) => handleEllipsisPress(postId)}
              documentId={user.uid}
            />
          ))}
        </ScrollView>
      )}
      <BottomNavigation navigation={navigation} currentUser={currentUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwapHome;
