import { Route, Routes } from "react-router-dom";
import "./App.scss";
import RegistrationPage from "./pages/registrationPage";

import NotFoundPage from "./pages/notFoundPage";

import Navbar from "./components/header";
import Footer from "./components/footer";
import WelcomeSection from "./components/homepage";
import LoginPage from "./components/loginForm";
import DoctorList from "./components/patietDashBoard";
import Authenticate from "./components/authenticate";
import SlotsTable from "./components/viewSlots";
import TakeAppointment from "./components/confirmAppointment";

function App() {
  return (
    <div>
      <Navbar />
      {
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          {
            <Route element={<Authenticate />}>
              <Route path="/dashboard" element={<DoctorList />} />
              <Route path="/appointments/:doctorId" element={<SlotsTable />} />
              <Route
                path="/take-appointment/:slotId"
                element={<TakeAppointment />}
              />
              <Route
                path="/cancel-appointment/:slotId"
                element={<TakeAppointment />}
              />
            </Route>
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
      <br />
      <Footer />
    </div>
  );
}

export default App;
