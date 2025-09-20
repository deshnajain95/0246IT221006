import axios from "axios";

let authToken = "";

export const setAuthToken = (token) => {
  authToken = token;
};

export const log = async (stack, level, packageName, message) => {
  if (!authToken) return;

  const logData = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: packageName.toLowerCase(),
    message,
  };

  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", logData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
};
