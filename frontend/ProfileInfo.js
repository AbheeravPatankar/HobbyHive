import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker"; 

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", 
  "Chandigarh", "Bhopal", "Indore", "Patna", "Surat", 
  "Nagpur", "Coimbatore", "Kochi", "Guwahati", "Visakhapatnam"
];

const states =  [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const countries = ["USA", "Canada", "UK", "India", "Australia", "Switzerland"];

const educations = ["High School", "Undergraduate", "Graduate", "Working", "Retired"];

const genders = ["Male", "Female"];

export default function ProfileInfo({ navigation, onProfileComplete }) {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const validateDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return regex.test(date);
  };

  

  const submittedUserDetails = async () => {
    if (!validateDate(dob)) {
      alert("Please enter the date in YYYY-MM-DD format");
      return;
    }

    if (phone.length != 10) {
      alert("inavlid phone number");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/saveUserDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          city,
          state,
          country,
          dob,
          phone,
          education,
          gender,
          email: user?.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to save details: ${data.message}`);
      }
      alert("User details saved successfully!");
      onProfileComplete();
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.headerText}>Profile Information</Text>
        
        {renderDropdown("City", city, setCity, cities)}
        {renderDropdown("State", state, setState, states)}
        {renderDropdown("Country", country, setCountry, countries)}
        {renderInput("Date of Birth", dob, setDob)}
        {renderInput("Phone No (Optional)", phone, setPhone)}
        {renderDropdown("Education", education, setEducation, educations)}
        {renderDropdown("Gender", gender, setGender, genders)}

        <TouchableOpacity style={styles.nextButton} onPress={submittedUserDetails}>
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

function renderDropdown(label, selectedValue, setter, options) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedValue} onValueChange={setter} style={styles.picker}>
          <Picker.Item label={`Select ${label}`} value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#ffdd99",
    paddingTop: 20,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#1a1100",
    borderRadius: 8,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
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

