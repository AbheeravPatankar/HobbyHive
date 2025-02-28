import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";

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
  const [user, setUser] = useState(null);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

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

  const toggleHobby = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/saveHobbies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user.email, hobbies: selectedHobbies }),
      });

      const data = await response.json();
      alert(data.message);
      onHobbiesSelected(selectedHobbies);
    } catch (error) {
      console.error("Error saving hobbies:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Hobbies</Text>
        {Object.keys(hobbiesData).map((category) => (
          <View key={category}>
            <TouchableOpacity
              style={styles.category}
              onPress={() => setExpandedCategory(expandedCategory === category ? null : category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
            {expandedCategory === category && (
              <FlatList
                data={hobbiesData[category]}
                keyExtractor={(hobby) => hobby}
                nestedScrollEnabled
                renderItem={({ item: hobby }) => (
                  <TouchableOpacity onPress={() => toggleHobby(hobby)}>
                    <Text
                      style={[
                        styles.hobbyText,
                        { color: selectedHobbies.includes(hobby) ? "#ffdd99" : "#1a1100" },
                      ]}
                    >
                      {hobby}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffedcc",
    paddingTop: 20,
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
    borderWidth: 2,
    borderColor: "#1a1100",
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
    color: "#1a1100",
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 5,
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
});

export default HobbyScreen;
