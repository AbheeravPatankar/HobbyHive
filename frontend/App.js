import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
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

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="HobbySurvey" component={HobbyRiskSurveyScreen} />
    </Tab.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <FilterScreen {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeTabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={() => {
                    setIsLoggedIn(true);
                    props.navigation.replace("HomeDrawer");
                  }}
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
                  onComplete={() => {
                    setIsLoggedIn(true);
                    props.navigation.replace("HomeDrawer");
                    e;
                  }}
                />
              )}
            </Stack.Screen>
          </>
        ) : null}
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
