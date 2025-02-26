import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";

function SignupScreen({ onSignupSuccess, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIC FOR SIGNUP HANDLING
  const handleSignup = () => {
    if (name && email && password) {
      alert("Signup successful!");
      onSignupSuccess(); // Move to ProfileScreen instead of HomeScreen
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#1a1100"
          value={name}
          onChangeText={setName}
        />
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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onGoToLogin}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  signupButton: {
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

export default SignupScreen;
