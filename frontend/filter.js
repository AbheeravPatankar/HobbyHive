import React, { useState } from "react";

import { get_profiles } from "./serverInterface";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,

  Platform,

  Modal,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { get_profiles } from "./serverInterface";

// Data constants
const CITIES = [
  { label: "Select City", value: "" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Delhi", value: "delhi" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Pune", value: "pune" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Lucknow", value: "lucknow" },
  { label: "Chandigarh", value: "chandigarh" },
  { label: "Bhopal", value: "bhopal" },
  { label: "Indore", value: "indore" },
  { label: "Surat", value: "surat" },
  { label: "Nagpur", value: "nagpur" },
  { label: "Patna", value: "patna" },
  { label: "Visakhapatnam", value: "visakhapatnam" },
  { label: "Kochi", value: "kochi" },
  { label: "Coimbatore", value: "coimbatore" },
];

const STATES = [
  { label: "Select State", value: "" },
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Bihar", value: "bihar" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "West Bengal", value: "west_bengal" },
  { label: "Chandigarh", value: "chandigarh" },
];

const AGE_GROUPS = [
  { label: "Select Age Group", value: null },
  { label: "Child (0-18)", value: "child" },
  { label: "Young (19-35)", value: "young" },
  { label: "Adult (36-50)", value: "adult" },
  { label: "Senior (51+)", value: "senior" },
];

const EDUCATION_STATUS = [
  { label: "Select Current Status", value: null },
  { label: "High School", value: "high-school" },
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Graduate", value: "graduate" },
  { label: "Doctorate", value: "doctorate" },
  { label: "Working", value: "working" },
  { label: "Retired", value: "retired" },
];

const EXPERIENCE_LEVELS = [
  { label: "Select Experience Level", value: null },
  { label: "Beginner (0-2 years)", value: "beginner" },
  { label: "Intermediate (3-5 years)", value: "intermediate" },
  { label: "Advanced (6-10 years)", value: "advanced" },
  { label: "Expert (10+ years)", value: "expert" },
];

const FilterScreen = () => {
  // State management with default values
  const [filters, setFilters] = useState({
    city: null,
    state: null,
    country: "india", // Default to India
    age_group: null,
    gender: null,
    current_status: null,
    followers: 0,
    experience: null,
  });

  // Custom Picker component for reusability
  const CustomPicker = ({ label, items, selectedValue, onValueChange }) => (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );

  // Handle filter submission
  const handleSubmit = () => {
    console.log("Selected Filters:", filters);
    get_profiles(filters);
    console.log("Fetching filtered profiles from server...");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.headerText}>Filter Options</Text>

      {/* Location Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <CustomPicker
          label="City"
          items={CITIES}
          selectedValue={filters.city}
          onValueChange={(value) => setFilters({ ...filters, city: value })}
        />
        <CustomPicker
          label="State"
          items={STATES}
          selectedValue={filters.state}
          onValueChange={(value) => setFilters({ ...filters, state: value })}
        />
      </View>

      {/* Demographics Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Demographics</Text>
        <CustomPicker
          label="Age Group"
          items={AGE_GROUPS}
          selectedValue={filters.age_group}
          onValueChange={(value) =>
            setFilters({ ...filters, age_group: value })
          }
        />

        <View style={styles.box}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            style={styles.picker}
            selectedValue={filters.gender}
            onValueChange={(value) => setFilters({ ...filters, gender: value })}
          >
            <Picker.Item label="Select Gender" value={null} />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>

      {/* Professional Info Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Professional Information</Text>
        <CustomPicker
          label="Current Status"
          items={EDUCATION_STATUS}
          selectedValue={filters.current_status}
          onValueChange={(value) =>
            setFilters({ ...filters, current_status: value })
          }
        />
        <CustomPicker
          label="Experience Level"
          items={EXPERIENCE_LEVELS}
          selectedValue={filters.experience}
          onValueChange={(value) =>
            setFilters({ ...filters, experience: value })
          }
        />
      </View>

      {/* Followers Section */}
      <View style={styles.box}>
        <Text style={styles.label}>
          Number of Followers: {filters.followers}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={1}
          value={filters.followers}
          onValueChange={(value) =>
            setFilters({ ...filters, followers: value })
          }
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#FF0000"
        />
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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

    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
  },
  box: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF0000",
    marginBottom: 8,
  },
  picker: {
    height: 40,
    width: "100%",
    marginBottom: 8,
    color: "#000000",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  applyButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FilterScreen;
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
