import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

export default function HobbyDetailsScreen({ hobbies, onComplete }) {
  const [hobbyDetails, setHobbyDetails] = useState({});

  const handleInputChange = (hobby, field, value) => {
    setHobbyDetails((prevDetails) => ({
      ...prevDetails,
      [hobby]: { ...prevDetails[hobby], [field]: value },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Enter Details for Your Hobbies</Text>
        {hobbies.map((hobby) => (
          <View key={hobby} style={styles.hobbyContainer}>
            <Text style={styles.hobbyTitle}>{hobby}</Text>
            <TextInput
              style={styles.input}
              placeholder="Schools / Academies Attended"
              placeholderTextColor="#1a1100"
              onChangeText={(text) => handleInputChange(hobby, "school", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#1a1100"
              onChangeText={(text) => handleInputChange(hobby, "certifications", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Experience"
              placeholderTextColor="#1a1100"
              onChangeText={(text) => handleInputChange(hobby, "about", text)}
            />
          </View>
        ))}
        <Button title="Next" onPress={onComplete} color="#1a1100" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffdd99",
    paddingTop: 50
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1100",
    marginBottom: 15,
    textAlign: "center",
  },
  hobbyContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  hobbyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1100",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1a1100",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#1a1100",
  },
});