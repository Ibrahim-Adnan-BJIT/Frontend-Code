import { Route, Routes } from "react-router-dom";
import "./App.scss";
import RegistrationPage from "./pages/registrationPage";

import NotFoundPage from "./pages/notFoundPage";

import Footer from "./components/footer";
import WelcomeSection from "./components/homepage";
import LoginPage from "./components/loginForm";

import Authenticate from "./components/authenticate";
import SlotsTable from "./components/viewSlots";
import TakeAppointment from "./components/confirmAppointment";
import MainComponent from "./components/actualNavbar";
import ListOfAppointments from "./components/listOfAppointments";
import CancelAppointment from "./components/cancelAppointment";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/patietDashBoard";
import AllCategories from "./components/seeCommunities";
import PostList from "./components/viewAllPosts";
import PostDetails from "./components/viewAPost";
import MyPosts from "./components/myPosts";
import EditPost from "./components/editPost";
import AddPost from "./components/createPost";
import UserProfile from "./components/patientProfile";
import UpdateHealthData from "./components/healthData";
import Recommendations from "./components/viewRecommendations";
import CreateProgress from "./components/createProgress";
import IncompleteProgress from "./components/viewIncompleteProgress";
import UpdateGoal from "./components/updateTrack";
import CompletedProgress from "./components/completedProgress";

function App() {
  return (
    <div>
      <MainComponent />
      {
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          {
            <Route element={<Authenticate />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments/:doctorId" element={<SlotsTable />} />
              <Route
                path="/take-appointment/:slotId"
                element={<TakeAppointment />}
              />
              <Route
                path="/cancel-appointment/:appointmentId"
                element={<CancelAppointment />}
              />
              <Route
                path="/see-appointments"
                element={<ListOfAppointments />}
              />
              <Route path="/recommendation" element={<Recommendations />} />
              <Route path="/see-community" element={<AllCategories />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/health-data" element={<UpdateHealthData />} />
              <Route path="/create-track" element={<CreateProgress />} />
              <Route
                path="/incomplete-track"
                element={<IncompleteProgress />}
              />
              <Route path="/complete-track" element={<CompletedProgress />} />
              <Route path="/edit-progress/:goalId" element={<UpdateGoal />} />

              <Route path="/category/:groupId" element={<PostList />} />
              <Route path="/post-details/:postId" element={<PostDetails />} />
              <Route path="/my-posts/:groupId" element={<MyPosts />} />
              <Route path="/edit-post/:postId" element={<EditPost />} />
              <Route path="/post-here/:groupId" element={<AddPost />} />
            </Route>
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
      <br />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
