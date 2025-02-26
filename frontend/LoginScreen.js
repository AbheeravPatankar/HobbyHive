import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from "react-native";

function LoginScreen({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIC FOR HANDLING LOGIN
  const handleLogin = () => {
    if (email === "yo" && password === "123") {
      onLoginSuccess(); // Move to HomeScreen
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#1a1100"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#1a1100"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onGoToSignup}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffedcc",
  },
  box: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#1a1100",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#ffdd99",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1100",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#1a1100",
    backgroundColor: "#ffedcc",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#1a1100",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffdd99",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#1a1100",
  },
  buttonText: {
    color: "#1a1100",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#007bff",
    marginTop: 15,
    fontSize: 16,
  },
});

export default LoginScreen;
