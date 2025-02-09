import React, { useState } from "react";
import { get_profiles } from "./serverInterface";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function FilterScreen() {
  // State variables for each filter
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedFollowers, setSelectedFollowers] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Function to collect and return all filter values
  function submitFilters() {
    const filterValues = {
      city: selectedCity,
      state: selectedState,
      country: selectedCountry,
      age: selectedAge,
      gender: selectedGender,
      education: selectedEducation,
      followers: selectedFollowers,
      experience: selectedExperience,
    };

    console.log("Selected Filters:", filterValues);

    get_profiles(filterValues);
    console.log(
      "applying filters and getting new cards from the server......."
    );
    return filterValues;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Filter Options</Text>

      {/* Location Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Location</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCity}
          onValueChange={(value) => setSelectedCity(value)}
        >
          <Picker.Item label="Select City" value={null} />
          <Picker.Item label="City 1" value="city1" />
          <Picker.Item label="City 2" value="city2" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={selectedState}
          onValueChange={(value) => setSelectedState(value)}
        >
          <Picker.Item label="Select State" value={null} />
          <Picker.Item label="State 1" value="state1" />
          <Picker.Item label="State 2" value="state2" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(value) => setSelectedCountry(value)}
        >
          <Picker.Item label="Select Country" value={null} />
          <Picker.Item label="Country 1" value="country1" />
          <Picker.Item label="Country 2" value="country2" />
        </Picker>
      </View>

      {/* Age Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Age</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedAge}
          onValueChange={(value) => setSelectedAge(value)}
        >
          <Picker.Item label="Select Age Group" value={null} />
          <Picker.Item label="Child (0-18)" value="0-18" />
          <Picker.Item label="Young Adult (19-35)" value="19-35" />
          <Picker.Item label="Adult (36-50)" value="36-50" />
          <Picker.Item label="Senior (51+)" value="51+" />
        </Picker>
      </View>

      {/* Gender Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedGender}
          onValueChange={(value) => setSelectedGender(value)}
        >
          <Picker.Item label="Select Gender" value={null} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Non-binary" value="non-binary" />
          <Picker.Item label="Prefer not to say" value="prefer-not-to-say" />
        </Picker>
      </View>

      {/* Education Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Education</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedEducation}
          onValueChange={(value) => setSelectedEducation(value)}
        >
          <Picker.Item label="Select Education Level" value={null} />
          <Picker.Item label="High School" value="high-school" />
          <Picker.Item label="Undergraduate" value="undergraduate" />
          <Picker.Item label="Graduate" value="graduate" />
          <Picker.Item label="Doctorate" value="doctorate" />
        </Picker>
      </View>

      {/* Number of People Following Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Number of People Following</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedFollowers}
          onValueChange={(value) => setSelectedFollowers(value)}
        >
          <Picker.Item label="Select Range" value={null} />
          <Picker.Item label="0-50" value="0-50" />
          <Picker.Item label="51-100" value="51-100" />
          <Picker.Item label="101-500" value="101-500" />
          <Picker.Item label="501+" value="501+" />
        </Picker>
      </View>

      {/* Experience Level Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Experience Level</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedExperience}
          onValueChange={(value) => setSelectedExperience(value)}
        >
          <Picker.Item label="Select Experience Level" value={null} />
          <Picker.Item label="Beginner (0-2 years)" value="0-2" />
          <Picker.Item label="Intermediate (3-5 years)" value="3-5" />
          <Picker.Item label="Advanced (6-10 years)" value="6-10" />
          <Picker.Item label="Expert (10+ years)" value="10+" />
        </Picker>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={submitFilters}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  box: {
    width: "80%",
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 8,
  },
  picker: {
    height: 40,
    width: "100%",
    marginBottom: 12,
    backgroundColor: "white",
    color: "black",
  },
  applyButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
