import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Button } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const getUserHobbies = async (email) => {
  try {
    const response = await fetch("http://localhost:3000/userhobby", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    console.log("Fetched hobbies:", data);

    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Error fetching hobbies:", err);
    return [];
  }
};

// Hobby Tab Screen
function HobbyScreen({ route }) {
  const { hobby, experience, description, school_years } = route.params;


  return (
    <View style={styles.tabContainer}>
      <Text style={styles.hobbyTitle}>{hobby}</Text>
      <Text style={styles.details}>Experience: {experience}</Text>
      <Text style={styles.details}>Description: {description}</Text>
      <Text style={styles.details}>School Years: {school_years}</Text>
    </View>
  );
}

function formatDOB(isoString) {
  if (!isoString) return "N/A";

  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ProfileDetail({ route }) {
  const profile = route.params?.profile || {};
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      const userHobbies = await getUserHobbies(profile.email);
      setHobbies(userHobbies);
      setLoading(false);
    };
    fetchHobbies();
  }, [profile.email]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.profileSection}>
          <Image
            style={styles.image}
            source={require("./assets/my_photo.png")}
          />
          <Text style={styles.name}>{profile.name || "N/A"}</Text>
          <Text style={styles.details}>DOB: {formatDOB(profile.dob)}</Text>
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
          {loading ? (
            <Text style={styles.details}>Loading hobbies...</Text>
          ) : hobbies.length > 0 ? (
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: { backgroundColor: "#ffdd99", elevation: 5 },
                tabBarIndicatorStyle: { backgroundColor: "#1a1100" },
                tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
              }}
            >
              {hobbies.map((hobbyItem, index) => (
                <Tab.Screen
                  key={index}
                  name={hobbyItem.hobby}
                  component={HobbyScreen}
                  initialParams={{
                    hobby: hobbyItem.hobby,
                    experience: hobbyItem.experience,
                    description: hobbyItem.description,
                    school_years: hobbyItem.school_years
                  }}
                />
              ))}
            </Tab.Navigator>
          ) : (
            <Text style={styles.details}>No hobbies found.</Text>
          )}

          {/* Go to Home Button */}
          <View style={styles.homeButtonContainer}>
            <Button title="Go to Home" onPress={() => navigation.navigate("HomeTabs", { screen: "Home" })} />
          </View>
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
    textAlign: "center",
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
  homeButtonContainer: {
    marginVertical: 20,
    alignItems: "center"
  },
  hobbyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1100",
  },
  details: {
    fontSize: 16,
    color: "#1a1100",
    marginVertical: 2,
    textAlign: "center",
  },
});

export default ProfileDetail;
