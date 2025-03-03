import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import HobbyScreen from "./HobbyScreen";
import ProfileInfo from "./ProfileInfo";
import HobbyDetailsScreen from "./HobbyDetailsScreen";
import FilterScreen from "./filter";
import HobbyRiskSurveyScreen from "./HobbyRiskSurveyScreen";
import ProfileDetail from "./ProfileDetail";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({setIsLoggedIn}) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="HobbySurvey" component={HobbyRiskSurveyScreen} />
    </Tab.Navigator>
  );
}

function HomeDrawer({ setIsLoggedIn}) {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <FilterScreen {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeTabs">
        {(props) => <TabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user is logged in when the app starts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedLogin = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(storedLogin === "true");
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  // ✅ Save login state in AsyncStorage
  const handleLoginSuccess = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  if (loading) return null; // Prevent flickering

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={handleLoginSuccess}
                  onGoToSignup={() => props.navigation.navigate("Signup")}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => (
                <SignupScreen
                  {...props}
                  onSignupSuccess={() =>
                    props.navigation.navigate("ProfileInfo")
                  }
                  onGoToLogin={() => props.navigation.navigate("Login")}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ProfileInfo">
              {(props) => (
                <ProfileInfo
                  {...props}
                  onProfileComplete={() =>
                    props.navigation.navigate("HobbyScreen")
                  }
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="HobbyScreen">
              {(props) => (
                <HobbyScreen
                  {...props}
                  onHobbiesSelected={(hobbies) =>
                    props.navigation.navigate("HobbyDetails", { hobbies })
                  }
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="HobbyDetails">
              {(props) => (
                <HobbyDetailsScreen
                  {...props}
                  hobbies={props.route.params?.hobbies || []}
                  onComplete={handleLoginSuccess}
                />
              )}
            </Stack.Screen>
          </>
        ) : null}
        <Stack.Screen name="HomeDrawer">
        {(props) => <HomeDrawer {...props} setIsLoggedIn={setIsLoggedIn} />}
</Stack.Screen>
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
