// clientSide/src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteerForm from "./components/VolunteerForm";
import TrainerForm from "./components/TrainerForm";
import TraineeForm from "./components/TraineeForm";
import PartnerForm from "./components/PartnerForm";
import HomePage from './components/HomePage/Home'
import Footer from './components/Footer'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/trainer" element={<TrainerForm />} />
        <Route path="/trainee" element={<TraineeForm />} />
        <Route path="/partner" element={<PartnerForm />} />
       <Route path="/" element={<HomePage />} />

    
      </Routes>
            <Footer/>

    </Router>
  );
};


export default App;
