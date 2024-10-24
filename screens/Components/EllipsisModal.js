// EllipsisModal.js
import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const EllipsisModal = ({
  isVisible,
  onClose,
  onSwapCost,
  onSwapDescription,
  onFollowUser,
  offerSwap,
  onSaveItem,
  onAboutAccount,
  onReport,
  post,
  saved,
  isFollowing,
  userEmail,
}) => {
  const [followWord, setFollowWord] = useState("-");

  useEffect(() => {
    const checkFollowWord = () => {
      if (post.userID === userEmail) {
        setFollowWord("-");
      } else {
        isFollowing ? setFollowWord("Unfollow") : setFollowWord("Follow");
      }
    };
    checkFollowWord();
  }, [isFollowing, post.userID, userEmail]);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="remove-outline"
              size={70}
              color="black"
              marginTop="-10%"
            />
          </View>
          <View style={styles.rowContainer}>
            {/* Save Item */}
            <TouchableOpacity
              style={[styles.option, styles.smallContainer]}
              onPress={onSaveItem}
            >
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={24}
                color="black"
              />

              <Text style={styles.optionText}>Save Item</Text>
            </TouchableOpacity>

            {/* Follow User */}
            <TouchableOpacity
              style={[styles.option, styles.smallContainer]}
              onPress={() => onFollowUser(post.userID)}
            >
              <Ionicons
                name={
                  isFollowing ? "person-remove-outline" : "person-add-outline"
                }
                color="black"
                size={24}
              />

              <Text style={styles.optionText}>{followWord}</Text>
            </TouchableOpacity>

            {/* Offer Swap */}
            <TouchableOpacity
              style={[styles.option, styles.smallContainer]}
              onPress={offerSwap}
            >
              <Ionicons
                name="swap-horizontal-outline"
                color="black"
                size={24}
              />
              <Text style={styles.optionText}>Offer Swap</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer2}>
            {/* Swap Cost */}

            <TouchableOpacity
              style={[styles.option2, styles.smallContainer]}
              onPress={onSwapCost}
            >
              <Text style={styles.optionText}>Estimated Cost</Text>
              <Text style={styles.optionSubText}>R {post.price}</Text>
            </TouchableOpacity>

            {/* Swap Description */}
            <TouchableOpacity
              style={[styles.option2, styles.smallContainer]}
              onPress={onSwapDescription}
            >
              <Text style={styles.optionText}>Accepting Cash Offers?</Text>
              <Text style={styles.optionSubText}>No</Text>
            </TouchableOpacity>
          </View>
          {/* About Account */}
          <View>
            <TouchableOpacity
              style={[styles.option3, styles.smallContainer3]}
              onPress={onAboutAccount}
            >
              <View
                style={[
                  styles.rowContainer,
                  {
                    marginBottom: -5,
                  },
                ]}
              >
                <Text style={styles.optionText3}>About Account</Text>
                <Ionicons
                  name="information-circle-outline"
                  color="black"
                  size={24}
                  style={{
                    marginRight: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            {/* Report */}
            <TouchableOpacity
              style={[styles.option3, styles.smallContainer3]}
              onPress={onReport}
            >
              <View
                style={[
                  styles.rowContainer,
                  {
                    marginBottom: -5,
                  },
                ]}
              >
                <Text style={styles.optionText3}>Report</Text>
                <Ionicons
                  name="alert-outline"
                  color="black"
                  size={24}
                  style={{
                    marginRight: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* Close Modal */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 450,
  },
  option: {
    paddingVertical: 15,
    width: "32%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  option2: {
    paddingVertical: 15,
    width: "49%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  option3: {
    paddingVertical: 15,
    width: "100%",
    // alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  smallContainer: {
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Slightly dark shade of the background color
  },
  smallContainer3: {
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Slightly dark shade of the background color
    marginTop: 10,
  },
  optionText: {
    fontSize: 12,
    color: "#333",
  },
  optionText3: {
    fontSize: 15,
    color: "#333",
    marginLeft: 20,
  },
  optionSubText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  closeButton: {
    paddingVertical: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 5,
    width: 150,
    marginTop: 40,
    marginLeft: 118,

    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EllipsisModal;
