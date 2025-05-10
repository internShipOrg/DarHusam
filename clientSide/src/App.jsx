// clientSide/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteerForm from "./components/VolunteerForm";
import TrainerForm from "./components/TrainerForm";
import TraineeForm from "./components/TraineeForm";
import PartnerForm from "./components/PartnerForm";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/trainer" element={<TrainerForm />} />
        <Route path="/trainee" element={<TraineeForm />} />
        <Route path="/partner" element={<PartnerForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
