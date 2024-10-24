import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";

const PostModal = ({ post, isVisible, onClose, onEdit, onDelete }) => {
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

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.price}>{"R " + post.price}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            data={post.postImages}
            renderItem={renderImage}
            sliderWidth={300}
            itemWidth={250}
            loop={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text>Delete Post</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  carouselContainer: {
    marginTop: 10,
  },
  carouselItem: {
    borderRadius: 8,
    overflow: "hidden",
  },
  carouselImage: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: -300,
  },
  editButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButton: {
    marginBottom: 250,
  },
});

export default PostModal;
