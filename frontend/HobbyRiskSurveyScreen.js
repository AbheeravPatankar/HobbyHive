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
      const response = await fetch("http://localhost:3000/gethobbies");
      const text = await response.text(); // Get raw response
      console.log("Raw response:", text); 
      const data = JSON.parse(text); 
      const dataArray = Object.values(data);


      setHobbies(dataArray);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
    }
  };

  const getHobbyData = async (hobby) => {
    setSelectedHobby(hobby);

    const response = await fetch("http://localhost:3000/gethobbyrisk", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hobby: hobby}),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
        alert("something went wrong.");
    }

    const numericData = Object.values(data[0]).map(value => Number(value) || 0);
    changeHobbyData(numericData);
    console.log("Selected hobby is:", hobby);
  };

  const hobbyRiskData = {
    labels: ["A", "B", "C", "D", "E"],
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
          hobbies.map((hobbyObj, index) => (
            <Picker.Item key={index} label={hobbyObj.hobby} value={hobbyObj.hobby} />
          ))
        ) : (
          <Picker.Item label="Loading..." value="" />
        )}
      </Picker>

      {selectedHobby != "select value" && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{selectedHobby} Risk Data</Text>
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