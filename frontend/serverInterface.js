import { HobbySeekerCard } from "./entity";
import axios from "axios";

const hobbySeekerCards = [
  new HobbySeekerCard(1, "Alice", 500, 200, "alice.jpg"),
  new HobbySeekerCard(2, "Bob", 80, 150, "bob.jpg"),
  new HobbySeekerCard(3, "Charlie", 60, 100, "charlie.jpg"),
  new HobbySeekerCard(4, "Diana", 90, 180, "diana.jpg"),
  new HobbySeekerCard(5, "Abheerav", 1000, 250, "eve.jpg"),
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

function addHobbySeekerCard(list, name, following, followers, profilePhoto) {
  const newCard = new HobbySeekerCard(name, following, followers, profilePhoto);
  list.push(newCard);
}
