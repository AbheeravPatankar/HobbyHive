import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FilterScreen from "./filter";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { get_profiles } from "./serverInterface";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  let profileCards = get_profiles();

  const [hobbySeekers, setHobbySeekers] = useState([]);

  useEffect(() => {
    console.log("Received profiles:", profileCards.length);
    setHobbySeekers(profileCards);
  }, []);

  const cardHeight = 100;
  const cardWidth = Dimensions.get("window").width * 0.9; // 90% of screen width

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

  const handleApplyFilter = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hobby Name Text */}
      <View style={styles.topBar}>
        <Text style={styles.hobbyNameText}>__HOBBY NAME__</Text>
        <TouchableOpacity
          style={styles.applyFilterButton}
          onPress={handleApplyFilter}
        >
          <Icon name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* List of Hobby Seekers */}
      <FlatList
        data={hobbySeekers} // Array of filtered data to render
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

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerContent={(props) => <FilterScreen {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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
  hobbyNameText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  applyFilterButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
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
