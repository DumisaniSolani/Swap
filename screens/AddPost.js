import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import BottomNavigation from "./Components/BottomNavigation";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../config";

const AddPost = ({ navigation }) => {
  const route = useRoute();
  const user = route.params.currentUser;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setBid] = useState("");
  const [images, setImages] = useState([]);
  const [postImages, setPostImageURLs] = useState([]);
  const [previewPost, setPreviewPost] = useState(null);
  const [differentLocation, setDifferentLocation] = useState(false);

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const selectedImages = result.assets.map((asset) => {
          const date = formatDate(new Date().toISOString());
          const email_ = user.email;
          const name = email_.substring(0, email_.indexOf("@"));
          const uniqueFileName = `${name}_${date}_${asset.fileName}`;
          return {
            uri: asset.uri,
            fileName: uniqueFileName,
          };
        });
        setImages([...images, ...selectedImages]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  async function savePost(
    title,
    username,
    description,
    postImages,
    location,
    userID,
    price
  ) {
    try {
      const docRef = await addDoc(collection(db, "swapposts"), {
        title: title,
        username: username,
        description: description,
        postImages: postImages,
        location: {
          provinceState: location.provinceState,
          streetName: location.streetName,
          townCity: location.townCity,
          postalCode: location.postalCode,
        },
        price: price,
        userID: userID,
        comments: [],
        state: "available",
        saved: false,
        archieved: false,
        createdAt: formatDate(new Date()),
      });
      //  console.log("Post added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  }

  const handlePreviewPost = () => {
    const postPreview = (
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Preview:</Text>
        <Text style={styles.previewTitle}>{title}</Text>
        <Text style={styles.previewDescription}>{description}</Text>
        <ScrollView horizontal style={styles.previewImagesContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.previewImage}
            />
          ))}
        </ScrollView>
      </View>
    );

    setPreviewPost(postPreview);
  };

  const uploadImagesAndGetURLs = async (images, location) => {
    const urls = [];

    await Promise.all(
      images.map(async (image) => {
        if (image) {
          const response = await fetch(image.uri);
          const blob = await response.blob();
          const uniqueFileName = `${image.fileName}`;
          const storageRef = ref(storage, "posts/" + uniqueFileName);
          const uploadTask = uploadBytesResumable(storageRef, blob);

          try {
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            urls.push(downloadURL);
          } catch (error) {
            console.error("Error uploading image: ", error);
          }
        }
      })
    );

    return urls;
  };

  const handleAddPost = async () => {
    setDescription("");
    setImages([]);
    setPreviewPost(null);

    const locationObject = {
      provinceState: user.provinceState,
      streetName: user.streetName,
      townCity: user.townCity,
      postalCode: user.postalCode,
    };

    const urls = await uploadImagesAndGetURLs(images, locationObject);
    await savePost(
      title,
      user.username,
      description,
      urls,
      locationObject,
      user.email,
      price
    );

    navigation.navigate("SwapHome", { user });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          maxLength={255}
          multiline={true}
          numberOfLines={5}
        />
        <TextInput
          style={styles.input}
          placeholder="Cost or estimate value of Swap"
          value={price}
          onChangeText={(text) => setBid(text)}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
          <Text style={styles.buttonText}>Add Images</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={handlePreviewPost}
        >
          <Text style={styles.buttonText}>Preview Post</Text>
        </TouchableOpacity>
        {previewPost && <View>{previewPost}</View>}

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Different Location?</Text>
          <Switch
            value={differentLocation}
            onValueChange={(newValue) => setDifferentLocation(newValue)}
          />
        </View>

        {differentLocation && (
          <TextInput
            style={styles.input}
            placeholder="Enter Location Details"
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
        <BottomNavigation navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 200,
    backgroundColor: "#f8f8f8",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  previewButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  previewDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImagesContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default AddPost;
