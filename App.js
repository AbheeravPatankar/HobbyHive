import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { HobbySeekerCard } from "./entity";
import { get_profiles } from "./server_interface";

export default function App() {
  let profileCards = get_profiles();

  const [hobbySeekers, setHobbySeekers] = useState([]);
  const [filteredSeekers, setFilteredSeekers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Received profiles:", profileCards.length);
    setHobbySeekers(profileCards);
    setFilteredSeekers(profileCards);
  }, []);

  const cardHeight = 100;
  const cardWidth = Dimensions.get("window").width * 0.9; // 90% of screen width

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = hobbySeekers.filter((seeker) =>
      seeker.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSeekers(filtered);
  };

  const handleApplyFilter = () => {
    // Implement additional filter logic if needed.
    console.log("Apply filter clicked");
  };

  function getRenderItem({ item }) {
    return (
      <View style={[styles.card, { height: cardHeight, width: cardWidth }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./assets/my_photo.png")}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>Following: {item.following}</Text>
          <Text style={styles.details}>Followers: {item.followers}</Text>
          <Text style={styles.details}>Location: Pune, Maharashtra, India</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar and Apply Filter Button */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.applyFilterButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>

      {/* List of Hobby Seekers */}
      <FlatList
        data={filteredSeekers} // Array of filtered data to render
        renderItem={getRenderItem} // Function to render each item
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        contentContainerStyle={styles.flatListContent} // Center all items
      />

      {/* Bottom Tab Panel */}
      <View style={styles.bottomTabPanel}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Tab 1</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Tab 2</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Tab 3</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Tab 4</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  applyFilterButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
    backgroundColor: "white",
  },
  imageContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "black",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 16,
    backgroundColor: "white",
    paddingVertical: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  bottomTabPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
