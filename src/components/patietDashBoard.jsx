import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Fetch the list of doctors from the API with the token in the header
    axios
      .get("http://localhost:9898/api/v2/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Our Doctors</h1>

        <div className="row">
          {doctors.map((doctor) => (
            <div key={doctor.doctorId} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={
                    doctor.doctorId % 2 === 0
                      ? "src/assets/img/doctors/doctor_2.jpg"
                      : "src/assets/img/doctors/doctor_3.jpg"
                  }
                  alt={
                    doctor.doctorId % 2 === 0
                      ? "Doctor Image 2"
                      : "Doctor Image 3"
                  }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {doctor.firstName} {doctor.lastName}
                  </h5>
                  <p className="card-text">Speciality: {doctor.speciality}</p>
                  <Link
                    to={`/appointments/${doctor.doctorId}`}
                    className="btn btn-primary"
                  >
                    See Appointments
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
