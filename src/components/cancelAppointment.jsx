import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelAppointment = () => {
  const { slotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Hit the cancel appointment API with the token in the header
    axios
      .post(`http://localhost:8081/api/v2/cancel/appointment/${slotId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Axios Response:", response);
        // Show success toast
        toast.success("Appointment canceled successfully!");
        // Navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        // Show error toast
        toast.error(error);
        // Navigate to the dashboard even in case of an error
        navigate("/dashboard");
      });
  }, [slotId, navigate]);

  return (
    <div>
      {/* Optional: You can display a loading spinner or other content while the cancellation is in progress */}
      <ToastContainer />
    </div>
  );
};

export default CancelAppointment;
