import logo from "./logo.svg";
import "./App.css";
import CreateAppointment from "./components/CreateAppointment";
import AppointmentsList from "./components/AppointmentsList";
import CreatePatient from "./components/CreatePatient";
import PatientsList from "./components/PatientsList";
import AssignAppointment from "./components/AssignAppointment";
import axios from "axios";
import { useEffect, useState } from "react";

export const API_BASE_URL = "http://localhost:8000";

const fetchAppointments = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/appointments/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchPatients = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/patients/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const App = () => {

  // currentPatient and currentAppointment hold the patient and appointment values
  // currently selected by user in UI
  const [currentPatient, setCurrentPatient] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const refetchAppointments = async () => {
    const appointments = await fetchAppointments();
    setAppointments(appointments);
  };

  useEffect(() => {
    refetchAppointments();
  }, []);

  const [patients, setPatients] = useState([]);
  const refetchPatients = async () => {
      const patients = await fetchPatients();
      setPatients(patients);
    };

    useEffect(() => {
      refetchPatients();
    }, []);
       
  return (
    <div className="App">
      <div className="App-logo">
      <img src={logo} alt="logo" />
      </div>
      <PatientsList patients={patients} setCurrentPatient={setCurrentPatient} />
      <CreateAppointment refetchAppointments={refetchAppointments} />
      <AppointmentsList appointments={appointments} setCurrentAppointment={setCurrentAppointment}/>
      <CreatePatient refetchPatients={refetchPatients} />
      <AssignAppointment patients={patients} appointments={appointments} currentPatient={currentPatient} currentAppointment={currentAppointment}/>
    </div>
  );
};

export default App;
