import { HobbySeekerCard } from "./entity";

const hobbySeekerCards = [
  new HobbySeekerCard(1, "Alice", 120, 200, "alice.jpg"),
  new HobbySeekerCard(2, "Bob", 80, 150, "bob.jpg"),
  new HobbySeekerCard(3, "Charlie", 60, 100, "charlie.jpg"),
  new HobbySeekerCard(4, "Diana", 90, 180, "diana.jpg"),
  new HobbySeekerCard(5, "Eve", 110, 250, "eve.jpg"),
];

export function get_profiles() {
  return hobbySeekerCards;
}

function addHobbySeekerCard(list, name, following, followers, profilePhoto) {
  const newCard = new HobbySeekerCard(name, following, followers, profilePhoto);
  list.push(newCard);
}
