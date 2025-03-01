import { HobbySeekerCard } from "./entity";
import axios from "axios";

const hobbySeekerCards = [
  new HobbySeekerCard(1, "Alice", 120, 200, "alice.jpg"),
  new HobbySeekerCard(2, "Bob", 80, 150, "bob.jpg"),
  new HobbySeekerCard(3, "Charlie", 60, 100, "charlie.jpg"),
  new HobbySeekerCard(4, "Diana", 90, 180, "diana.jpg"),
  new HobbySeekerCard(5, "Eve", 110, 250, "eve.jpg"),
];

export function get_profiles(filters) {
  //send the filters to server and retrieve filtered profiles ...

  axios
    .post("http://localhost:3000/profiles", filters)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return hobbySeekerCards;
}

export async function getHobbiesfromServer() {
  //make the call to the server to get the list of hobbies using the profile id
  arr = [];
  const res = await axios.get("http://localhost:3000/hobby/all");
  return Array.isArray(res.data) ? res.data : Object.values(res.data);
}

export async function getHobbyRiskDataFromServer(hobby) {
  //make the API call to the server which gives the risk data for that particular hobby
  arr = [];
  res = await axios.get("http://localhost:3000/hobby/riskData/" + hobby);
  console.log("result : " + res.data);
  return Array.isArray(res.data) ? res.data : Object.values(res.data);
}
