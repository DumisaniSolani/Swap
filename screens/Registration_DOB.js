import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegistrationDOBPage = ({ navigation }) => {
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute();
  const fullName = route.params.fullName; // Should be "fullName" not "fullname"
  const passWord = route.params.password; // Should be "password" not "passWord"

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const handleNext = () => {
    // Add logic to handle the next step (e.g., navigate to the next registration screen)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>What's your date of birth?</Text>
        <Text style={styles.subHeading}>
          Use your own date of birth, even if the account is for a business, or
          something else. No one will see this info unless you choose to share
          it. Why do I need to provide my date of birth?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerButtonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("RegistrationResidence", {
            fullName: fullName,
            password: passWord,
            dob: dob,
          })
        }
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.loginText}>
        <TouchableOpacity onPress={() => navigation.navigate("LandingPage")}>
          <View style={styles.footer}>
            <Text>Already have an account?</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    marginTop: -60,
    marginBottom: 300,
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginLink: {
    color: "#007BFF",
    marginLeft: 5,
  },
  footer: {
    marginTop: 200,
  },
});

export default RegistrationDOBPage;
