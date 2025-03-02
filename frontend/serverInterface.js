import axios from "axios";
import { HobbySeekerCard } from "./entity";

export async function get_profiles() {
  try {
    const response = await fetch("http://localhost:3000/profiles");
    const users = response.data;

    // Convert database response to HobbySeekerCard objects
    return users.map(
      (user, index) =>
        new HobbySeekerCard(
          index + 1, // ID (since DB might not provide a sequential ID)
          user.name,
          user.followers || 0, // Ensure followers count isn't null
          0, // Assuming "following" isn't stored in DB, set to 0
          user.city,
          user.state,
          user.country,
          "default.jpg" // Default image (replace with user profile if available)
        )
    );
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
}
