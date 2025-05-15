// clientSide/src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteerForm from "./components/joinUs/VolunteerForm";
import TrainerForm from "./components/joinUs/TrainerForm";
import TraineeForm from "./components/joinUs/TraineeForm";
import PartnerForm from "./components/joinUs/PartnerForm";
import IndividualPartnerForm from "./components/joinUs/IndividualPartnerForm";
import JoinUsOptions from "./components/joinUs/JoinUsOptions";
import TermsPage from "./components/joinUs/TermsPage";
import HomePage from './components/HomePage/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResourceLibrary from './components/ResourceLibrary'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/join-us/:type/terms" element={<TermsPage />} />
            <Route path="/join-us" element={<JoinUsOptions />} />
            <Route path="/join-us/volunteer" element={<VolunteerForm />} />
            <Route path="/join-us/trainer" element={<TrainerForm />} />
            <Route path="/join-us/trainee" element={<TraineeForm />} />
            <Route path="/join-us/partner" element={<PartnerForm />} />
            <Route path="/join-us/individual" element={<IndividualPartnerForm />} />
            <Route path="/resources" element={<ResourceLibrary/>} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
