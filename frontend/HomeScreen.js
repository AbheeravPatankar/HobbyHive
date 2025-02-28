import React, { useEffect, useState } from "react";
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

import Icon from "react-native-vector-icons/FontAwesome";


function HomeScreen({ navigation }) {  
    const [hobbySeekers, setHobbySeekers] = useState([]);
  
    useEffect(() => {
        // Fetch profiles when component mounts
        const fetchProfiles = async () => {
          try {
            const response = await fetch("http://localhost:3000/profiles");
            const text = await response.text(); // Get raw response
            console.log("Raw response:", text); 

            const data = JSON.parse(text); // Convert to JSON
            setHobbySeekers(data);
          } catch (error) {
            console.error("Error fetching profiles:", error);
          }
        };
    
        fetchProfiles();
      }, []); 

      
  
    const cardHeight = 100;
    const cardWidth = Dimensions.get("window").width * 0.9;
  
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
            <Text style={styles.details}>Location: {item.city}, {item.state}, {item.country}</Text>
          </View>
        </View>
      );
    }
  
    const handleApplyFilter = () => {
      navigation.openDrawer();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.hobbyNameText}>HobbyHive</Text>
          <TouchableOpacity
            style={styles.applyFilterButton}
            onPress={handleApplyFilter}
          >
            <Icon name="filter" size={20} color="#1a1100" />
          </TouchableOpacity>
        </View>
  
        <FlatList
          data={hobbySeekers}
          renderItem={getRenderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
  
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
      backgroundColor: "#ffedcc",
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
      color: "#1a1100",
    },
    applyFilterButton: {
      backgroundColor: "#ffdd99",
      padding: 10,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#1a1100",
    },
    flatListContent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#1a1100",
      borderRadius: 10,
      overflow: "hidden",
      marginVertical: 8,
      backgroundColor: "#ffdd99",
    },
    imageContainer: {
      backgroundColor: "#ffdd99",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: "#1a1100",
    },
    infoContainer: {
      flex: 1,
      paddingLeft: 16,
      backgroundColor: "#ffedcc",
      paddingVertical: 16,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1a1100",
      marginBottom: 4,
    },
    details: {
      fontSize: 14,
      color: "#1a1100",
    },
    bottomTabPanel: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 70,
      flexDirection: "row",
      backgroundColor: "#ffdd99",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 2,
      borderColor: "#1a1100",
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tabText: {
      color: "#1a1100",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default HomeScreen;