import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getHobbiesfromServer,
  getHobbyRiskDataFromServer,
} from "./serverInterface";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const HobbyRiskSurveyScreen = () => {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState("");
  const [hobbyData, changeHobbyData] = useState([]);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const id = 1;
      const fetchedHobbies = await getHobbiesfromServer();
      setHobbies(fetchedHobbies);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
    }
  };

  const getHobbyData = async (hobby) => {
    setSelectedHobby(hobby);

    data = await getHobbyRiskDataFromServer(hobby);
    changeHobbyData(data);
    console.log("Selected hobby is:", hobby);
  };

  const hobbyRiskData = {
    labels: ["A", "B", "C", "D", "E", "F", "G"],
    datasets: [
      {
        data: hobbyData,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Hobby:</Text>

      <Picker
        selectedValue={selectedHobby}
        onValueChange={getHobbyData}
        style={styles.picker}
      >
        {hobbies.length > 0 ? (
          hobbies.map((hobby, index) => (
            <Picker.Item key={index} label={hobby} value={hobby} />
          ))
        ) : (
          <Picker.Item label="Loading..." value="" />
        )}
      </Picker>

      {selectedHobby != "select value" && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tennis Hobby Data</Text>
          <BarChart
            style={graphStyle}
            data={hobbyRiskData}
            width={screenWidth - 40} // Adjust width
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showValuesOnTopOfBars={true}
          />
        </View>
      )}
    </View>
  );
};

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
};

const chartConfig = {
  backgroundGradientFrom: "#f3f3f3",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(34, 124, 230, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    strokeDasharray: "4 4",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    width: 250,
    height: 50,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HobbyRiskSurveyScreen;
