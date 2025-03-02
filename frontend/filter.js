import React, { useState } from "react";
import { get_profiles } from "./serverInterface";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [options, setOptions] = useState([]);

  const filters = {
    city: [
      "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
      "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", 
      "Chandigarh", "Bhopal", "Indore", "Patna", "Surat", 
      "Nagpur", "Coimbatore", "Kochi", "Guwahati", "Visakhapatnam"
    ],
    
    state: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
      "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ],
    
    country: ["USA", "Canada", "UK", "India", "Australia", "Switzerland"],
    
    education: ["High School", "Undergraduate", "Graduate", "Working", "Retired"],
    
    gender: ["Male", "Female"],
    
    age: ["0-18", "19-35", "36-50", "51+"],

    followers: ["0-50", "51-100", "101-500", "501+"],
  };

  function openModal(filterType, setter) {
    setOptions(filters[filterType]);
    setCurrentSelection(() => setter);
    setModalVisible(true);
  }
  const navigation = useNavigation();

  const submitFilters = async () => {
    const filterValues = {
      city: selectedCity,
      state: selectedState,
      country: selectedCountry,
      age: selectedAge,
      gender: selectedGender,
      education: selectedEducation,
      followers: selectedFollowers,
    };

    console.log("Selected Filters:", filterValues);

    navigation.navigate("HomeDrawer", { screen: "HomeTabs", params: { screen:"Home", params: { filters: filterValues } }});

  }

  function renderFilter(label, selectedValue, setter) {
    return (
      <View style={styles.filterRow}>
      <TouchableOpacity style={styles.filterBox} onPress={() => openModal(label.toLowerCase(), setter)}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.selectedValue}>{selectedValue || "Select"}</Text>
      </TouchableOpacity>
      {selectedValue && (
        <TouchableOpacity style={styles.clearButton} onPress={() => setter(null)}>
          <Text style={styles.clearButtonText}>✖</Text>
        </TouchableOpacity>
      )}
      </View>
    );
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
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f8f9fa",
    marginTop: 50
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
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
});