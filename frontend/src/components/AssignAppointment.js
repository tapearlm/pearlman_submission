import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

const assignAppointment = async (patient_pk, appointment_pk) => {
  try {
    const result = await axios.patch(API_BASE_URL + "/appointments/" + appointment_pk + "/book/", {"patient_pk": patient_pk});
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};


// AssignAppointment takes the patient and appointment selected by user in UI, parses the fields,
// and makes a patch request to assign the appointment to the patient.

const AssignAppointment = ({patients, appointments, currentPatient, currentAppointment}) => {

  const [submitMessage, setSubmitMessage] = useState("");
    
  const handleSubmit = async (event) => {
      event.preventDefault();
      setSubmitMessage("");
      
      // Parse text input from lists to get the actual patient and appointment
      const currentPatientIdx = parseInt(Object.keys(currentPatient)[0]);
      const currentApptIdx = parseInt(Object.keys(currentAppointment)[0]);
      
      const result = await assignAppointment(patients[currentPatientIdx].pk, appointments[currentApptIdx].pk);
      if (!result) {
        setSubmitMessage("Unable to assign appointment");
        return;
          }
    };

    
    return (
      <>
        <h2>Assign an Appointment</h2>
        <form onSubmit={handleSubmit}>
            <button type="submit" disabled={! currentPatient || ! currentAppointment}>
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
    


export default AssignAppointment;
