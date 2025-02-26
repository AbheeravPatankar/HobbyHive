import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { get_profiles } from "./serverInterface";
const FilterScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    get_profiles()
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  const selectProfile = (profile) => {
    setSelectedProfile(profile);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedProfile ? selectedProfile.name : "Select Profile"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => selectProfile(item)}
              >
                <Text style={styles.profileText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  filterButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: 100,
  },
  profileItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileText: {
    fontSize: 16,
  },
});

export default FilterScreen;
