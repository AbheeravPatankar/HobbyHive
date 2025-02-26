import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const hobbiesData = {
  "Creative Arts": ["Painting", "Drawing", "Sculpting", "Photography", "Digital Art"],
  "Cooking and Baking": ["Gourmet Cooking", "Pastry Making", "Fermenting", "Barbecuing"],
  "Collecting": ["Vintage Items", "Coins", "Stamps", "Comic Books", "Action Figures"],
  "Outdoor Activities": ["Hiking", "Bird Watching", "Gardening", "Stargazing"],
  "Indoor Activities": ["Board Games", "Video Games", "Cooking", "Reading"],
  "Sports and Fitness": ["Basketball", "Tennis", "Yoga", "Cycling", "Gymnastics"],
  "Technology": ["Programming", "Web Design", "Robotics", "Video Editing"],
  "Education": ["Language Learning", "Online Courses", "Research", "Finance & Business"],
  "Strategy Games": ["Chess", "Sudoku", "Crossword", "Trivia Quizzes"],
  "Social Activities": ["Volunteering", "Book Clubs", "Traveling", "Choirs"],
  "Mindfulness": ["Meditation", "Pottery", "Spa & Wellness", "Casual Walks"],
};

const HobbyScreen = ({ onHobbiesSelected }) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleHobby = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = async () => {
    /*
    try {
      await fetch("https://your-api.com/saveHobbies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hobbies: selectedHobbies }),
      });
      alert("Hobbies saved successfully!");
      onProfileComplete();
    } catch (error) {
      console.error("Error saving hobbies:", error);
    }
    */
   onHobbiesSelected(selectedHobbies);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Hobbies</Text>
      <FlatList
        data={Object.keys(hobbiesData)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.category} onPress={() => setExpandedCategory(item)}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
            {expandedCategory === item && (
              <FlatList
                data={hobbiesData[item]}
                keyExtractor={(hobby) => hobby}
                renderItem={({ item: hobby }) => (
                  <TouchableOpacity onPress={() => toggleHobby(hobby)}>
                    <Text
                      style={[styles.hobbyText, { color: selectedHobbies.includes(hobby) ? "#ffdd99" : "#1a1100" }]}
                    >
                      {hobby}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffedcc",
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
    color: "#1a1100",
    textAlign: "center",
  },
  category: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffdd99",
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1100",
  },
  hobbyText: {
    fontSize: 16,
    marginLeft: 20,
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: "#ffdd99",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#1a1100",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1100",
  },
  category: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffdd99",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1a1100",
  },
  hobbyText: {
    fontSize: 16,
    marginLeft: 20,
    paddingVertical: 5,
    color: "#1a1100",
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 5,
  },
});

export default HobbyScreen;
