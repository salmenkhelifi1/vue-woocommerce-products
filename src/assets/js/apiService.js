// apiService.js
import axios from "axios";

export async function fetchData() {
  try {
    const response = await axios.get("/data.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error back to the caller
  }
}
