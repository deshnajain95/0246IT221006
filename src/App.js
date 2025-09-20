import React, { useState, useEffect } from "react";
import { log, setAuthToken } from "./utils/logger";
import { getAuthToken } from "./services/auth";

export default function App() {
  const [input, setInput] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const [authToken, setToken] = useState("");

  useEffect(() => {
    const registrationData = {
      email: "your-email@abc.edu",
      name: "Your Name",
      rollNo: "your-roll",
      accessCode: "your-accessCode",
      clientID: "your-clientID",
      clientSecret: "your-clientSecret",
    };

    getAuthToken(registrationData)
      .then((token) => {
        setToken(token);
        setAuthToken(token);
        log("frontend", "info", "component", "Auth token obtained successfully");
      })
      .catch((err) => {
        log("frontend", "error", "component", `Failed to get auth token: ${err}`);
      });
  }, []);

  const handleShorten = () => {
    if (!input) {
      log("frontend", "warn", "component", "Empty input, cannot shorten URL");
      return;
    }

    const newLink = {
      original: input,
      short: `short.ly/${Math.random().toString(36).substring(2, 8)}`,
    };

    setShortLinks([...shortLinks, newLink]);
    log("frontend", "info", "component", `URL shortened: ${input} -> ${newLink.short}`);
    setInput("");
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL here"
      />
      <button onClick={handleShorten}>Shorten URL</button>

      <h2>Short Links</h2>
      {shortLinks.length === 0 ? (
        <p>No short links created yet</p>
      ) : (
        <ul>
          {shortLinks.map((link, i) => (
            <li key={i}>
              Original: <a href={link.original}>{link.original}</a> | Short:{" "}
              <a href={link.original}>{link.short}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
