import React, { useState } from "react";
import { get_profiles } from "./serverInterface";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { get_profiles } from "./serverInterface";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [options, setOptions] = useState([]);

  const filters = {
    city: ["City 1", "City 2", "City 3"],
    state: ["State 1", "State 2", "State 3"],
    country: ["Country 1", "Country 2", "Country 3"],
    age: ["0-18", "19-35", "36-50", "51+"],
    gender: ["Male", "Female", "Non-binary", "Prefer not to say"],
    education: ["High School", "Undergraduate", "Graduate", "Doctorate"],
    followers: ["0-50", "51-100", "101-500", "501+"],
    experience: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
  };

  function openModal(filterType, setter) {
    setOptions(filters[filterType]);
    setCurrentSelection(() => setter);
    setModalVisible(true);
  }

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
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Filter Options</Text>
      {renderFilter("City", selectedCity, setSelectedCity)}
      {renderFilter("State", selectedState, setSelectedState)}
      {renderFilter("Country", selectedCountry, setSelectedCountry)}
      {renderFilter("Age", selectedAge, setSelectedAge)}
      {renderFilter("Gender", selectedGender, setSelectedGender)}
      {renderFilter("Education", selectedEducation, setSelectedEducation)}
      {renderFilter("Followers", selectedFollowers, setSelectedFollowers)}
      {renderFilter("Experience", selectedExperience, setSelectedExperience)}

      <TouchableOpacity style={styles.applyButton} onPress={submitFilters}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    currentSelection(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  function renderFilter(label, selectedValue, setter) {
    return (
      <TouchableOpacity
        style={styles.filterBox}
        onPress={() => openModal(label.toLowerCase(), setter)}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.selectedValue}>{selectedValue || "Select"}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f8f9fa",
    marginTop: 50,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  filterBox: {
    width: "85%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 14,
    color: "#888",
  },
  applyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
