import axios from "axios";

export const getAuthToken = async (registrationData) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      registrationData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.access_token;
  } catch (err) {
    console.error("Auth token fetch failed:", err);
    throw err;
  }
};
