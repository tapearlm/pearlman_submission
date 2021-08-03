import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

const createPatient = async (firstName, lastName) => {
  try {
    const result = await axios.post(API_BASE_URL + "/patients/", {
      first_name: firstName,
      last_name: lastName,
    });
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const CreatePatient = ({ refetchPatients }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setSubmitMessage("");
    const result = await createPatient(firstName, lastName);
    if (!result) {
      setSubmitMessage("Unable to create Patient");
      return;
    }
    await refetchPatients();
    setSubmitMessage("Created Patient: " + JSON.stringify(result));
    setIsLoading(false);
  };

  return (
    <>
      <h2>Create a new Patient</h2>
      <form onSubmit={handleSubmit}>
        <label for="first-name">First Name:</label>
        <br />
        <input type="text"
          id="first-name"
          onChange={(val) => setFirstName(val.target.value)}
          value={firstName}
        />
        <br />
        <label for="last-name">Last Name:</label>
        <br />
        <input type="text"
          id="last-name"
          onChange={(val) => setLastName(val.target.value)}
          value={lastName}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {submitMessage && (
        <p>
          <i>{submitMessage}</i>
        </p>
      )}
    </>
  );
};

export default CreatePatient;
