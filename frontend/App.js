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


import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import HobbyScreen from "./HobbyScreen";
import ProfileInfo from "./ProfileInfo";
import HobbyDetailsScreen from "./HobbyDetailsScreen";

import { NavigationContainer } from "@react-navigation/native";
import FilterScreen from "./filter";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { get_profiles } from "./serverInterface";


const Drawer = createDrawerNavigator();

import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const loggedIn = 0;


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


function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <FilterScreen {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [hasSelectedHobbies, setHasSelectedHobbies] = useState([]);
  const [hasCompletedHobbyDetails, setHasCompletedHobbyDetails] =
    useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          isProfileComplete ? (
            hasSelectedHobbies.length > 0 ? (
              hasCompletedHobbyDetails ? (
                <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
              ) : (
                <Stack.Screen name="HobbyDetails">
                  {(props) => (
                    <HobbyDetailsScreen
                      {...props}
                      hobbies={hasSelectedHobbies}
                      onComplete={() => setHasCompletedHobbyDetails(true)}
                    />
                  )}
                </Stack.Screen>
              )
            ) : (
              <Stack.Screen name="HobbyScreen">
                {(props) => (
                  <HobbyScreen
                    {...props}
                    onHobbiesSelected={(hobbies) =>
                      setHasSelectedHobbies(hobbies)
                    }
                  />
                )}
              </Stack.Screen>
            )
          ) : (
            <Stack.Screen name="ProfileInfo">
              {(props) => (
                <ProfileInfo
                  {...props}
                  onProfileComplete={() => setIsProfileComplete(true)}
                />
              )}
            </Stack.Screen>
          )
        ) : showSignup ? (
          <Stack.Screen name="Signup">
            {(props) => (
              <SignupScreen
                {...props}
                onSignupSuccess={() => {
                  setIsLoggedIn(true);
                  setIsProfileComplete(false);
                }}
                onGoToLogin={() => setShowSignup(false)}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                onLoginSuccess={() => setIsLoggedIn(true)}
                onGoToSignup={() => setShowSignup(true)}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
