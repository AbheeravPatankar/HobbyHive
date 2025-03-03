import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function getUserHobbies() {
  // Simulating an API call to fetch hobbies
  return ["Tennis", "Cricket", "Programming"];
}

// Hobby Tab Screen
function HobbyScreen({ route }) {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>This is the {route.name} tab</Text>
    </View>
  );
}

function formatDOB(isoString) {
  if (!isoString) return "N/A"; // Handle missing DOB

  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ProfileDetail({ route }) {
  const profile = route.params?.profile || {};
  const hobbies = getUserHobbies();

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {/* User Info Section */}
        <View style={styles.profileSection}>
          <Image
            style={styles.image}
            source={require("./assets/my_photo.png")}
          />
          <Text style={styles.name}>{profile.name || "N/A"}</Text>
          <Text style={styles.details}>DOB: {formatDOB(profile.dob)}</Text>
          <Text style={styles.details}>Email: {profile.email || "N/A"}</Text>
          <Text style={styles.details}>City: {profile.city || "N/A"}</Text>
          <Text style={styles.details}>State: {profile.state || "N/A"}</Text>
          <Text style={styles.details}>
            Country: {profile.country || "N/A"}
          </Text>
          <Text style={styles.details}>Gender: {profile.gender || "N/A"}</Text>
          <Text style={styles.details}>
            Current Status: {profile.current_status || "N/A"}
          </Text>
          <Text style={styles.details}>
            Age Group: {profile.age_group || "N/A"}
          </Text>
          <Text style={styles.details}>
            Followers: {profile.followers || 0}
          </Text>
        </View>

        {/* Hobby Tabs Section */}
        <View style={{ flex: 1, height: 500 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: "#ffdd99", elevation: 5 },
              tabBarIndicatorStyle: { backgroundColor: "#1a1100" },
              tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
            }}
          >
            {hobbies.map((hobby, index) => (
              <Tab.Screen key={index} name={hobby} component={HobbyScreen} />
            ))}
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffedcc",
    paddingTop: 20,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#ffdd99",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1100",
  },
  details: {
    fontSize: 16,
    color: "#1a1100",
    marginVertical: 2,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffedcc",
    padding: 16,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  tabText: {
    fontSize: 18,
    color: "#1a1100",
  },
});

export default ProfileDetail;
