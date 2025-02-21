import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";

export default function ProfileInfo({ navigation, onProfileComplete }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerText}>Profile Information</Text>
        {renderInput("Full Name", name, setName)}
        {renderInput("City", city, setCity)}
        {renderInput("State", state, setState)}
        {renderInput("Country", country, setCountry)}
        {renderInput("Date of Birth", dob, setDob)}
        {renderInput("Email (Optional)", email, setEmail)}
        {renderInput("Phone No (Optional)", phone, setPhone)}
        {renderInput("Education", education, setEducation)}
        {renderInput("Gender", gender, setGender)}

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onProfileComplete}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function renderInput(label, value, setter) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setter}
        placeholder={`Enter ${label}`}
        placeholderTextColor="#1a1100"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#ffdd99",
    paddingTop: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1100",
    marginBottom: 20,
  },
  inputContainer: {
    width: "85%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1100",
    marginBottom: 4,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#1a1100",
    color: "#1a1100",
  },
  nextButton: {
    backgroundColor: "#1a1100",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  nextButtonText: {
    color: "#ffdd99",
    fontSize: 16,
    fontWeight: "bold",
  },
});

